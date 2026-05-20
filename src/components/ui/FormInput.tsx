"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
}

export function FormInput({ label, error, id, className = "", ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-text-subtle font-sans text-xs tracking-widest uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-ring w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none ${error ? "border-destructive" : ""} ${className}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id: string;
  action?: React.ReactNode;
}

const MAX_TEXTAREA_HEIGHT = 320;

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea({ label, error, id, action, className = "", ...props }, forwardedRef) {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const autoResize = useCallback(() => {
      const el = internalRef.current;
      if (!el) return;
      el.style.height = "0px";
      const scrollH = el.scrollHeight;
      el.style.height = `${Math.min(scrollH, MAX_TEXTAREA_HEIGHT)}px`;
      el.style.overflowY = scrollH > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
    }, []);

    const refCallback = useCallback(
      (el: HTMLTextAreaElement | null) => {
        internalRef.current = el;
        if (typeof forwardedRef === "function") forwardedRef(el);
        else if (forwardedRef)
          (forwardedRef as React.RefObject<HTMLTextAreaElement | null>).current = el;
        if (el) autoResize();
      },
      [forwardedRef, autoResize],
    );

    useEffect(() => {
      autoResize();
    }, [props.value, props.defaultValue, autoResize]);

    return (
      <div className="flex flex-col gap-1">
        {(label || action) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                htmlFor={id}
                className="text-text-subtle font-sans text-xs tracking-widest uppercase"
              >
                {label}
              </label>
            )}
            {action}
          </div>
        )}
        <textarea
          ref={refCallback}
          id={id}
          className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-ring w-full resize-none rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none ${error ? "border-destructive" : ""} ${className}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
          onInput={autoResize}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-destructive text-xs">
            {error}
          </p>
        )}
      </div>
    );
  },
);
