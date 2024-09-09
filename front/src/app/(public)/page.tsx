import { PublicJobs } from "./components/PublicJobs";
import { PublicLayout } from "./components/PublicLayout";

export default function HomePage() {
  return (
    <PublicLayout title="Procurar vaga" showSearch={true}>
      <PublicJobs />
    </PublicLayout>
  );
}
