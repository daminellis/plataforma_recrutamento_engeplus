import { AppButton } from "@/components/ui/button/AppButton";
import { CheckCircleOutline, Group } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CrossCircledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { formatDistance, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";

interface JobItemListProps {
  id: number;
  title: string;
  expirationDate: string;
  status: boolean;
  applicationsCount: number;
}

export const JobItemList = ({
  id,
  title,
  expirationDate,
  status,
  applicationsCount,
}: JobItemListProps) => {
  const date = new Date(expirationDate);
  const nowDate = new Date();

  return (
    <div className="flex items-center px-2 py-4">
      <div className="flex-[2]">
        <h3 className="font-semibold">{title}</h3>

        <span className="text-sm text-gray-500">
          {(isBefore(date, nowDate) ? "Expirado " : "Expira ") +
            formatDistance(date, nowDate, {
              addSuffix: true,
              locale: ptBR,
            })}
        </span>
      </div>

      <span
        className={`flex-1 ${
          status ? "text-green-500" : "text-red-500"
        } text-sm font-semibold text-nowrap flex items-center gap-2`}
      >
        {status ? (
          <>
            <CheckCircleOutline /> Ativo
          </>
        ) : (
          <>
            <CrossCircledIcon className="size-5" /> Expirado
          </>
        )}
      </span>

      <span className="flex-1 text-gray-500 text-sm flex items-center gap-2">
        {" "}
        <Group /> {applicationsCount} aplicações{" "}
      </span>

      <div className="flex-1 flex items-center gap-2 justify-between">
        <AppButton color="secondary" size="sm" href={`aplicacoes/${id}`}>
          Ver aplicações
        </AppButton>

        <IconButton>
          <DotsVerticalIcon className="size-5" />
        </IconButton>
      </div>
    </div>
  );
};
