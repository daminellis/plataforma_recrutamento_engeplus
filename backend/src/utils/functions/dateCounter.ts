import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
export function tempoPostado(dataPostagem: Date): string {
    const now = new Date();
    const minutes = differenceInMinutes(now, dataPostagem);
    if (minutes < 60) {
      if (minutes === 1) {
        return 'Há 1 minuto';
      }
      return `Há ${minutes} minutos`;
    }
    const hours = differenceInHours(now, dataPostagem);
    if (hours < 24) {
      if (hours === 1) {
        return 'Há 1 hora';
      }
      return `Há ${hours} horas`;
    }
    const days = differenceInDays(now, dataPostagem);
    if (days === 1) {
      return 'Há 1 dia';
    }
    return `Há ${days} dias`;
  }