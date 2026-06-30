const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  if (!EMAIL_RE.test(trimmed)) return "Enter a valid email address";
  return null;
}

export function validatePassword(password: string, minLength = 6): string | null {
  if (!password) return "Password is required";
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  if (password.length > 72) return "Password is too long";
  return null;
}

export function validateRegisterPassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 72) return "Password is too long";
  if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Include at least one number";
  if (!/[^A-Za-z0-9]/.test(password)) return "Include at least one special character";
  return null;
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 50) return "Name must be at most 50 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes";
  }
  return null;
}
