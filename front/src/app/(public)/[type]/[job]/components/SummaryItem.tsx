import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SummaryItemProps {
  Icon:
    | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  value: string;
}

export const SummaryItem = ({ Icon, title, value }: SummaryItemProps) => {
  return (
    <div className="flex-1">
      <Icon className="text-blue-500 size-8" />

      <div className="mt-4 flex flex-col gap-1">
        <span className="font-light text-gray-500 text-sm">{title}</span>
        <span className="font-medium text-sm">{value}</span>
      </div>
    </div>
  );
};
