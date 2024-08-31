import { ButtonHTMLAttributes } from "react";

export const PrimaryButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 transition-colors py-3 px-6 rounded-md text-white font-medium flex items-center justify-center gap-3"
      {...props}
    >
      {children}
    </button>
  );
};
