import { IconProps } from '@radix-ui/react-icons/dist/types';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IconType = | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
| OverridableComponent<SvgIconTypeMap<{}, "svg">>;