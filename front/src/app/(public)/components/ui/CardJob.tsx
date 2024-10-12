import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { CalendarIcon } from "@radix-ui/react-icons";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/button/AppButton";

export const CardJob = ({ isListGrid }: { isListGrid: Boolean }) => {
  return isListGrid ? <CardJobContentList /> : <CardJobContentGrid />;
};

const CardJobContentGrid = () => {
  return (
    <article className="w-[24.5rem] h-52 outline outline-1 outline-gray-400 rounded-lg p-5 flex flex-col justify-between hover:outline-blue-300 hover:outline-4 cursor-pointer transition-all">
      <h2 className="text-xl font-medium text-gray-900">
        Desenvolvedor Front end PHP - Pleno
        <AppBadge
          text="Presencial"
          textColorClass="text-blue-500"
          backgroundColorClass="bg-blue-500/20"
        />
      </h2>

      <div>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <PlaceOutlinedIcon />
          <span>Criciuma - Santa Catarina</span>
        </div>

        <div className="text-gray-500 text-sm mt-2 flex justify-between">
          <div className="flex gap-1 items-center">
            <AttachMoneyOutlinedIcon className="size-6" />
            <span>R$ 4K-6K</span>
          </div>

          <div className="flex gap-1 items-center">
            <CalendarIcon />
            <span>4 dias atrás</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const CardJobContentList = () => {
  return (
    <article className="w-full h-32 outline outline-1 outline-gray-400 rounded-lg p-5 flex flex-col hover:outline-blue-300 hover:outline-4 cursor-pointer transition-all">
      <h2 className="text-xl font-medium text-gray-900">
        Desenvolvedor Front end PHP - Pleno
        <AppBadge
          text="Presencial"
          textColorClass="text-blue-500"
          backgroundColorClass="bg-blue-500/20"
        />
      </h2>

      <div className="flex-1 flex justify-end">
        <AppButton className="max-md:hidden" color="secondary">
          Aplicar agora
        </AppButton>
      </div>

      <div className="flex items-center gap-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <PlaceOutlinedIcon />
          <span>Criciuma - Santa Catarina</span>
        </div>

        <div className="flex items-center">
          <AttachMoneyOutlinedIcon className="size-6" />
          <span>R$ 4K-6K</span>
        </div>

        <div className="flex items-center gap-1">
          <CalendarIcon />
          <span>4 dias atrás</span>
        </div>
      </div>
    </article>
  );
};
