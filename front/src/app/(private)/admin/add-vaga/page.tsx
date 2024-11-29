import { InputLabel } from "@/components/form/InputLabel";
import { MultiSelectTag } from "@/app/(private)/components/form/MultiSelectTag";
import { apiAuth } from "@/service/axiosAuth";
import { TagType } from "@/types/Tag";
import { SelectLabel } from "@/components/form/SelectLabel";
import { SectorType } from "@/types/Job";
import { TextEditor } from "./components/TextEditor";
import { AppButton } from "@/components/ui/button/AppButton";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { handleSubmit } from "./onSubmit";

const gapLineForm = "flex gap-3 items-end";
const titleClass = "text-lg font-bold mt-5";

type EnumType = {
  tempoDeExperiencia: Record<string, any>;
  nivelDeEducacao: Record<string, any>;
  nivelDeExperiencia: Record<string, any>;
  modalidade: Record<string, any>;
};

export default async function AddVagaPage() {
  const apiInstance = await apiAuth();
  const dataTags = (await apiInstance.get<TagType[]>("tags/all")).data;

  const dataSectors = (await apiInstance.get<SectorType[]>("setores/all")).data;
  const dataEnums = (await apiInstance.get<EnumType>("vagas/enums")).data;

  function formatEnums(dataEnums: Record<string, any>) {
    const enums = Object.keys(dataEnums).map((key, i) => {
      return {
        id: i,
        nome: dataEnums[key],
      };
    });

    return enums;
  }

  return (
    <>
      <h1 className="text-lg">Adicionar vaga</h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className={gapLineForm}>
          <InputLabel
            idAndName="titulo"
            label="Título"
            placeholder="Adicione cargom função, vagas e etc..."
            className="mt-5 flex-1"
            required
          />

          <SelectLabel
            data={[
              { id: 1, nome: "Criciúma - Santa Catarina" },
              { id: 2, nome: "Florianópolis - Santa Catarina" },
            ]}
            idAndName="regiao"
            label="Região"
            className="flex-1"
            required
          />
        </div>

        <div className={gapLineForm}>
          <MultiSelectTag
            data={dataTags}
            idAndName="tags"
            label="Tags"
            placeholder="Palavra-chave do trabalho, tags e etc..."
            className="flex-1"
            textAdd="Nova tag"
            routeAdd="tags/create"
          />

          <SelectLabel
            idAndName="setor"
            label="Área de atuação"
            className="flex-1"
            data={dataSectors}
            valueIsId={true}
            required
          />
        </div>

        <h1 className={titleClass}>Salário</h1>

        <div className={gapLineForm}>
          <InputLabel
            idAndName="salarioInicial"
            label="Salário inicial"
            type="number"
            placeholder="R$"
            className="flex-1"
            required
          />

          <InputLabel
            idAndName="salarioFinal"
            label="Salário final"
            type="number"
            placeholder="R$"
            className="flex-1"
            required
          />
        </div>

        <h1 className={titleClass}>Requisitos</h1>

        <div className={gapLineForm}>
          <SelectLabel
            idAndName="educacao"
            label="Educação"
            className="flex-1"
            data={formatEnums(dataEnums.nivelDeEducacao)}
            required
          />

          <SelectLabel
            idAndName="experiencia"
            label="Experiência"
            className="flex-1"
            data={formatEnums(dataEnums.tempoDeExperiencia)}
            required
          />

          <SelectLabel
            idAndName="modalidade"
            label="Modalidade"
            className="flex-1"
            data={formatEnums(dataEnums.modalidade)}
            required
          />
        </div>

        <div className={gapLineForm}>
          <InputLabel
            idAndName="numeroVagas"
            label="Número de vagas"
            type="number"
            min={1}
            defaultValue={1}
            className="flex-1"
            required
          />

          <InputLabel
            idAndName="dataExpiracao"
            label="Data de expiração"
            type="date"
            defaultValue={1}
            className="flex-1"
            required
          />

          <SelectLabel
            idAndName="nivelExperiencia"
            label="Nível de experiência"
            className="flex-1"
            data={formatEnums(dataEnums.nivelDeExperiencia)}
            required
          />
        </div>

        <h1 className={titleClass}>Descrição e responsabilidades</h1>

        <TextEditor />

        <InputLabel
          idAndName="responsabilidades"
          label="Responsabilidades"
          placeholder="Separe as responsabilidades por (/) sem espaços"
          required
        />

        <AppButton className="w-fit" type="submit">
          Adicionar vaga <ArrowRightIcon />{" "}
        </AppButton>
      </form>
    </>
  );
}
