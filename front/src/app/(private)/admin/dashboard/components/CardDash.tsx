import { IconType } from "@/types/Icon";

type CardDashProps = {
  number: number;
  subText: string;
  background: string;
  colorIcon: string;
  Icon: IconType;
};

export const CardDash = (props: CardDashProps) => {
  return (
    <div
      className={`flex items-center h-28 w-80 rounded-lg p-5 ${props.background}`}
    >
      <div className="flex-1">
        <h2 className="text-2xl text-gray-900 font-semibold">{props.number}</h2>

        <span className="text-sm text-gray-700">{props.subText}</span>
      </div>
      <div className="size-16 rounded bg-white flex items-center justify-center">
        <props.Icon className={`size-8 ${props.colorIcon}`} />
      </div>
    </div>
  );
};
