import { PublicLayout } from "../components/PublicLayout";
import { CardJob } from "../components/ui/CardJob";

interface JobTypePageProps {
  params: {
    type: string;
  };
}

export default function JobTypePage({ params }: JobTypePageProps) {
  return (
    <PublicLayout title={`Vagas de ${params.type}`}>
      <CardJob />
    </PublicLayout>
  );
}
