import { JobPrivateType } from "@/types/Job";
import { JobItemList } from "./JobItemList";

export const JobTable = ({ data }: { data: JobPrivateType[] }) => {
  return (
    <section className="mt-3">
      <div className="flex bg-gray-300 rounded-md p-2">
        <span className="flex-[2]">Título</span>
        <span className="flex-1">Status</span>
        <span className="flex-1">Aplicações</span>
        <span className="flex-1">Ações</span>
      </div>

      <div>
        {data.map((job) => (
          <JobItemList
            key={job.id}
            id={job.id}
            applicationsCount={job.candidaturaCount}
            expirationDate={job.dataExpiracao}
            status={job.disponivel}
            title={job.titulo}
          />
        ))}
      </div>
    </section>
  );
};
