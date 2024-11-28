import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/button/AppButton";
import { Modal } from "@/components/ui/Modal";
import { apiClientInstace } from "@/service/axiosClientAuth";
import { CandidatureType } from "@/types/Candidature";
import { IconButton } from "@mui/material";
import {
  ArrowRightIcon,
  DotsVerticalIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentModal } from "./ContentModal";
import { ThreeDotsButton } from "./ThreeDotsButton";

interface CandidatesItemListProps {
  state: CandidatureType;
  setState: React.Dispatch<React.SetStateAction<CandidatureType[]>>;
}

export const CandidatesItemList = (props: CandidatesItemListProps) => {
  const candidatureDate = new Date(props.state.dataCandidatura);

  const dto = {
    favorito: !props.state.favorito,
  };

  const reSortData = async () => {
    props.setState((prev) => {
      const updated = prev.map((c) =>
        c.id === props.state.id ? { ...c, favorito: !c.favorito } : c
      );

      return updated.sort((a, b) => {
        if (a.favorito && !b.favorito) return -1;
        if (!a.favorito && b.favorito) return 1;
        return 0;
      });
    });

    await apiClientInstace()
      .put(`candidaturas/update/${props.state.id}`, dto)
      .then(() =>
        toast.success(
          `Candidato ${props.state.id} ${
            dto.favorito
              ? "favoritado com sucesso"
              : "removido dos favoritos com sucesso"
          }!`
        )
      )
      .catch(() => {
        toast.error(
          `Erro ao ${
            dto.favorito
              ? "favoritar candidato"
              : "remover favorito do candidato"
          } ${props.state.id}!`
        );
      });
  };

  return (
    <div className="flex border-b p-5">
      <ToastContainer />
      <div className="flex-1 flex items-center gap-4">
        <h2>{props.state.id}</h2>
        <div>
          <h2 className="text-base font-medium">{props.state.nomeCompleto}</h2>
          <span className="text-sm text-gray-500">
            {candidatureDate.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }) +
              " - " +
              candidatureDate.toLocaleDateString("pt-BR")}
          </span>
        </div>

        <AppBadge text="Entrevistar" corTag="#0fa0ad" />
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`p-3 rounded-md transition-colors ${
            props.state.favorito ? "bg-blue-200" : "hover:bg-blue-100"
          } text-yellow-500`}
          onClick={reSortData}
        >
          {props.state.favorito ? (
            <StarFilledIcon className="size-5" />
          ) : (
            <StarIcon className="size-5" />
          )}
        </button>

        <Modal
          className="max-w-3xl w-full"
          content={<ContentModal state={props.state} />}
        >
          <AppButton className="h-fit">
            Visualizar <ArrowRightIcon />
          </AppButton>
        </Modal>
        <ThreeDotsButton id={props.state.id} />
      </div>
    </div>
  );
};
