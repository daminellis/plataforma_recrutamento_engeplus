import { IconType } from "@/app/types/Icon";

interface SummaryItemProps {
  Icon: IconType;
  title: string;
  value: string;
}

export const SummaryItem = ({ Icon, title, value }: SummaryItemProps) => {
  return (
    <div className="w-[9.472rem]">
      <Icon className="text-blue-500 size-8" />

      <div className="mt-4 flex flex-col gap-1">
        <span className="font-light text-gray-500 text-sm">{title}</span>
        <span className="font-medium text-sm">{value}</span>
      </div>
    </div>
  );
};
