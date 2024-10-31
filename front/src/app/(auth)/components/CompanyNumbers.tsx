import { IconType } from "@/types/Icon";

interface CompanyNumbersProps {
  Icon: IconType;
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
