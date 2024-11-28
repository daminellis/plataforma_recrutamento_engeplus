import { apiAuth } from "@/service/axiosAuth";
import { JobTable } from "../../components/ui/JobTable";
import { JobPrivateType } from "@/types/Job";

export default async function VagasPage() {
  const axiosInstance = await apiAuth();
  const { data } = await axiosInstance.get<JobPrivateType[]>(
    "vagas/all-private"
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center text-xl">
          <h1 className="font-semibold">Minhas vagas</h1>
          <span className="text-gray-600">({data.length})</span>
        </div>
      </div>

      <JobTable data={data} />
    </>
  );
}
