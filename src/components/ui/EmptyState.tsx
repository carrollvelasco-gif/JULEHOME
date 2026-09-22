import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 px-6 py-16 text-center", className)}>
      <div className="grid size-16 place-items-center rounded-full bg-surface-muted text-olive-600 dark:text-olive-300">
        {icon}
      </div>
      <h3 className="font-display text-xl font-medium text-ink-950 dark:text-foreground">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
