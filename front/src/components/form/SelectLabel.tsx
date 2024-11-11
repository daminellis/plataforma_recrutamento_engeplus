import { InputType } from "@/types/Input";

type SelectLabelProps = InputType &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    inputClassName?: string;
    data: {
      id: number;
      nome: string;
    }[];
    valueIsId?: boolean;
  };

export const SelectLabel = ({
  idAndName,
  label,
  className,
  inputClassName,
  valueIsId,
  data,
  ...props
}: SelectLabelProps) => {
  return (
    <div className={className}>
      <label htmlFor={idAndName} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        name={idAndName}
        id={idAndName}
        className={`outline-indigo-500 w-full border border-gray-300 rounded-md p-2.5 mt-1 text-gray-600 ${
          inputClassName ? inputClassName : ""
        }`}
        {...props}
      >
        <option value="" disabled selected>
          Selecione...
        </option>

        {data.map((item) => (
          <option key={item.id} value={valueIsId ? item.id : item.nome}>
            {item.nome}
          </option>
        ))}
      </select>
    </div>
  );
};
