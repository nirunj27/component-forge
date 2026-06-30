import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@component-forge/app-ui/components/ui/input";
import { Button } from "@component-forge/app-ui/components/ui/button";
import { cn } from "@component-forge/app-ui/lib/utils";

interface PasswordFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
  showStrength?: boolean;
  strengthScore?: number;
}

export function PasswordField({
  className,
  showStrength,
  strengthScore = 0,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          className={cn("pr-10", className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
        </Button>
      </div>
      {showStrength && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full",
                  strengthScore >= i ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
