// src/components/Button.tsx
import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
};

export const Button = ({
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-lg px-4 py-2 transition",
        fullWidth && "w-full",
        variant === "primary" &&
          "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900",
        variant === "secondary" &&
          "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
};
