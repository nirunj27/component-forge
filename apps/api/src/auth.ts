import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { User, UserRole } from "./store.js";
import { findUserById, toPublicUser } from "./store.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-jwt-secret";

export interface AuthPayload {
  userId: string;
  role: UserRole;
}

export interface AuthedRequest extends Request {
  user?: User;
}

export function signToken(user: User): string {
  return jwt.sign({ userId: user.id, role: user.role } satisfies AuthPayload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}

export async function authMiddleware(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const payload = verifyToken(header.slice(7));
    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireRoles(...roles: UserRole[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Insufficient permissions" });
      return;
    }
    next();
  };
}

export function canCreateComponents(role: UserRole): boolean {
  return role === "admin" || role === "developer";
}

export { toPublicUser };
