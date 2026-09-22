import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label?: string;
  error?: string;
  hint?: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ label, error, hint, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400"
        >
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-embers-600 dark:text-embers-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}

const controlBase =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-all duration-300 focus:border-olive-500 focus:outline-none focus:ring-4 focus:ring-olive-500/10 dark:bg-surface dark:text-foreground";

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(controlBase, className)} {...props} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(controlBase, "min-h-32 resize-y", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<"select">>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cn(controlBase, "appearance-none", className)} {...props}>
        {children}
      </select>
    );
  },
);
