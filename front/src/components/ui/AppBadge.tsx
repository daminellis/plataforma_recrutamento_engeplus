import { Tailwindest } from "tailwindest";

interface AppBadgeProps {
  text: string;
  corTag: string;
}

export const AppBadge = ({ text, corTag }: AppBadgeProps) => {
  return (
    <span
      className="p-1.5 rounded-md text-xs ml-2 whitespace-nowrap h-fit"
      style={{ backgroundColor: `${corTag}33`, color: corTag }}
    >
      {text}
    </span>
  );
};
