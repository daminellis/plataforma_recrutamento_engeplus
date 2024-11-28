import { AppButton } from "@/components/ui/button/AppButton";
import { apiClientInstace } from "@/service/axiosClientAuth";
import { CandidatureType } from "@/types/Candidature";
import { JobType } from "@/types/Job";
import { getUserInfos } from "@/utils/getAuthLocalStorage";
import { WhatsApp } from "@mui/icons-material";
import {
  ArrowRightIcon,
  EnvelopeClosedIcon,
  FileIcon,
} from "@radix-ui/react-icons";

export const ContentModal = ({ state }: { state: CandidatureType }) => {
  const userInfos = getUserInfos();
  const createURLArchive = () => {
    const blob = new Blob([new Uint8Array(state.cvData.data)], {
      type: state.cvType,
    });

    const url = URL.createObjectURL(blob);
    if (state.cvType == "application/vnd.openxmlformats-officedocument.word") {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${state.nomeCompleto
        .replaceAll(" ", "-")
        .toLowerCase()}.docx`;
      link.click();
    } else {
      window.open(url, "_blank");
    }

    URL.revokeObjectURL(url);
  };
  const formatTypeFile = (type: string) => {
    const fileTypeMap: { [key: string]: string } = {
      "application/pdf": "PDF",
      "application/vnd.openxmlformats-officedocument.word": "DOCX",
      "image/jpeg": "JPEG",
      "image/jpg": "JPG",
    };

    return fileTypeMap[type.toLowerCase()] || "Desconhecido";
  };

  const sendMessageWhatsapp = async () => {
    window.open(
      `https://wa.me/${state.telefone}?text=Olá ${
        state.nomeCompleto.split(" ")[0]
      }, tudo bem?
  Me chamo ${
    userInfos?.nomeCompleto.split(" ")[0]
  } e estou entrando em contato para falar sobre a vaga de ${await getTitleJob()} que você se candidatou.
  Ainda está disponível para conversar sobre a vaga?
  `,
      "_blank"
    );
  };

  const getTitleJob = async () => {
    const { data } = await apiClientInstace().get<JobType>(
      `vagas/find/${window.location.href.split("aplicacoes/")[1]}`
    );

    return data.titulo;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-semibold">{state.nomeCompleto}</h2>
          <span className="text-sm">{state.telefone}</span>
        </div>

        <div className="flex gap-2">
          <AppButton
            size="sm"
            color="outline"
            onClick={() => (window.location.href = `mailto:${state.email}`)}
          >
            <EnvelopeClosedIcon />
            Enviar email
          </AppButton>

          <AppButton size="sm" onClick={sendMessageWhatsapp}>
            <WhatsApp />
            Enviar whatsapp
          </AppButton>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-2">Experiência profissional</h2>
          <p className="max-h-52 text-gray-500 overflow-y-auto pr-5">
            {state.descricao}
          </p>
        </div>

        <div
          className="w-64 h-fit border border-blue-200 rounded-lg p-5 cursor-pointer"
          onClick={createURLArchive}
        >
          <h3 className="text-lg font-medium mb-2 text-slate-950">Curriculo</h3>
          <div className="flex items-center gap-2 h-10 text-gray-400">
            <FileIcon className="h-full w-fit" />

            <span className="flex-1 font-medium">
              {formatTypeFile(state.cvType)}
            </span>

            <div className="h-full w-10 bg-blue-500/20 rounded text-blue-500 flex items-center justify-center">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
