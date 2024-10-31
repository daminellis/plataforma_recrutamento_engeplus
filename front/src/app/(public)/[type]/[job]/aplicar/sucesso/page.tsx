import { AppButton } from "@/components/ui/button/AppButton";
import { DoneAll } from "@mui/icons-material";

export default function SucessPage() {
  return (
    <section className="flex items-center justify-center flex-1">
      <div className="flex flex-col items-center gap-8">
        <div className="size-24 bg-blue-500/20 flex items-center justify-center rounded-full">
          <DoneAll className="text-blue-500 size-12" />
        </div>

        <h1 className="text-2xl font-semibold text-center">
          🎉 Parábens, sua candidatura foi recebida!!
        </h1>
        <p className="text-center font-light">
          Ficamos muito felizes por receber sua inscrição e esperamos que você
          trabalhe com a gente! <br />
          Aguarde nosso contato para saber sobre as próximas etapas.
        </p>

        <AppButton color="secondary" href="/">
          Voltar ao início
        </AppButton>
      </div>
    </section>
  );
}
