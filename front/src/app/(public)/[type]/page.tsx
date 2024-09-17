import { PublicJobs } from "../components/PublicJobs";
import { PublicLayout } from "../components/PublicLayout";

interface JobTypePageProps {
  params: {
    type: string;
  };
}

export default function JobTypePage({ params }: JobTypePageProps) {
  return (
    <PublicLayout title={`Vagas de ${params.type}`} showSearch>
      <PublicJobs />
    </PublicLayout>
  );
}
