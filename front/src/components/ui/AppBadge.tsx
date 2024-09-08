import { Tailwindest } from "tailwindest";

type TextColor = Tailwindest["color"];
type BackgroundColor = Tailwindest["backgroundColor"];

interface AppBadgeProps {
  text: String;
  textColorClass: TextColor;
  backgroundColorClass: BackgroundColor;
}

export const AppBadge = ({
  text,
  textColorClass,
  backgroundColorClass,
}: AppBadgeProps) => {
  return (
    <span
      className={`${textColorClass} ${backgroundColorClass} p-1.5 rounded-md text-xs ml-2`}
    >
      {text}
    </span>
  );
};
