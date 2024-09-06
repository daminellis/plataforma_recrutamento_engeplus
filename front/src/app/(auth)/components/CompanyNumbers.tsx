import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface CompanyNumbersProps {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  number: number;
  description: string;
}

export const CompanyNumbers = ({
  Icon,
  number,
  description,
}: CompanyNumbersProps) => {
  return (
    <div>
      <div className="w-10 h-10 mb-4 bg-white bg-opacity-10 rounded-md flex items-center justify-center">
        <Icon className="size-5 text-gray-300" />
      </div>

      <span className="text-gray-300 text-sm">{number}</span>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
};
