import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { CalendarIcon } from "@radix-ui/react-icons";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/button/AppButton";
import { JobType } from "@/types/Job";
import { formatSalaryMinMax } from "@/utils/formatNumbers";
import { useRouter } from "next/navigation";
import { formatTextToUrl } from "@/utils/textTransform";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type CardJobProps = JobType & {
  isListGrid: Boolean;
};

type InternCardJobProps = CardJobProps & {
  onClick: () => void;
};

export const CardJob = (props: CardJobProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/${formatTextToUrl(props.setor.nome)}/${props.id}-${formatTextToUrl(
        props.titulo
      )}`
    );
  };

  return props.isListGrid ? (
    <CardJobContentList {...props} onClick={handleClick} />
  ) : (
    <CardJobContentGrid {...props} onClick={handleClick} />
  );
};

const CardJobContentGrid = (props: InternCardJobProps) => {
  return (
    <article
      className="w-[24.5rem] h-52 outline outline-1 outline-gray-400 rounded-lg p-5 flex flex-col justify-between hover:outline-blue-300 hover:outline-4 cursor-pointer transition-all select-none"
      onClick={props.onClick}
    >
      <h2 className="text-xl font-medium text-gray-900">
        {props.titulo}
        {props.tags.map((tag) => (
          <AppBadge key={tag.id} text={tag.nome} corTag={tag.corTag} />
        ))}
      </h2>

      <div>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <PlaceOutlinedIcon />
          <span>{props.regiao}</span>
        </div>

        <div className="text-gray-500 text-sm mt-2 flex justify-between">
          <div className="flex gap-1 items-center">
            <AttachMoneyOutlinedIcon className="size-6" />
            <span>
              {formatSalaryMinMax(props.salarioMinimo, props.salarioMaximo)}
            </span>
          </div>

          <div className="flex gap-1 items-center">
            <CalendarIcon />
            <span>
              {formatDistanceToNow(new Date(props.dataPostagem), {
                addSuffix: true,
                locale: ptBR,
              }).replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

const CardJobContentList = (props: InternCardJobProps) => {
  return (
    <article
      className="w-full h-32 outline outline-1 outline-gray-400 rounded-lg p-5 flex flex-col hover:outline-blue-300 hover:outline-4 cursor-pointer transition-all select-none"
      onClick={props.onClick}
    >
      <h2 className="text-xl font-medium text-gray-900">
        {props.titulo}
        {props.tags.map((tag) => (
          <AppBadge key={tag.id} text={tag.nome} corTag={tag.corTag} />
        ))}
      </h2>

      <div className="flex-1 flex justify-end">
        <AppButton className="max-md:hidden" color="secondary">
          Aplicar agora
        </AppButton>
      </div>

      <div className="flex items-center gap-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <PlaceOutlinedIcon />
          <span> {props.regiao} </span>
        </div>

        <div className="flex items-center">
          <AttachMoneyOutlinedIcon className="size-6" />
          <span>
            {formatSalaryMinMax(props.salarioMinimo, props.salarioMaximo)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <CalendarIcon />
          <span>4 dias atrás</span>
        </div>
      </div>
    </article>
  );
};
