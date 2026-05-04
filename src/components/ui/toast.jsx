import * as React from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = React.forwardRef(
  /**
   * @param {any} props
   * @param {any} ref
   */
  (props, ref) => (
    <div
      ref={ref}
      className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      {...props}
    />
  )
);

ToastProvider.displayName = "ToastProvider";

const ToastViewport = React.forwardRef(
  /**
   * @param {any} props
   * @param {any} ref
   */
  (props, ref) => (
    <div
      ref={ref}
      className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      {...props}
    />
  )
);

ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef(
  /**
   * @param {any} props
   * @param {any} ref
   */
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);

Toast.displayName = "Toast";

const ToastAction = React.forwardRef(
  /**
   * @param {any} props
   * @param {any} ref
   */
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm",
        className
      )}
      {...props}
    />
  )
);

ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef(
  /**
   * @param {any} props
   * @param {any} ref
   */
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  )
);

ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef(
  /**
   * @param {any} props
   * @param {any} ref
   */
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
);

ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(
  /**
   * @param {any} props
   * @param {any} ref
   */
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-sm opacity-90",
        className
      )}
      {...props}
    />
  )
);

ToastDescription.displayName = "ToastDescription";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};