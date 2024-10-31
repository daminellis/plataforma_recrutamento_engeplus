"use client";

import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonClass = tv({
  base: "transition-colors rounded-md font-medium flex items-center justify-center gap-3",
  variants: {
    color: {
      primary: "bg-blue-500 hover:bg-blue-600 text-white",
      secondary:
        "bg-blue-500/20 hover:bg-blue-600 text-blue-500 hover:text-white",
    },
    size: {
      sm: "py-2 px-4",
      md: "py-3 px-6",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonClass>;

interface AppButtonProps
  extends ButtonVariants,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  href?: string;
  children: React.ReactNode;
}

export const AppButton = ({
  href,
  className,
  children,
  ...props
}: AppButtonProps) => {
  const router = useRouter();
  return (
    <button
      className={buttonClass({ ...props, className })}
      onClick={props.onClick || (() => href && router.push(href))}
      {...props}
    >
      {children}
    </button>
  );
};
