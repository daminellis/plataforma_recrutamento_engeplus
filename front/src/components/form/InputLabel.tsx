import { InputType } from "@/types/Input";
import { InputHTMLAttributes } from "react";

type InputLabelProps = InputType &
  InputHTMLAttributes<HTMLInputElement> & {
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    inputClassName?: string;
  };

export const InputLabel = ({
  idAndName,
  label,
  className,
  type,
  placeholder,
  inputClassName,
  ...props
}: InputLabelProps) => {
  return (
    <div className={className}>
      <label htmlFor={idAndName} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type || "text"}
        name={idAndName}
        id={idAndName}
        placeholder={placeholder}
        className={`outline-indigo-500 w-full border border-gray-300 rounded-md p-2 mt-1 text-gray-600 ${
          inputClassName ? inputClassName : ""
        }`}
        {...props}
      />
    </div>
  );
};
