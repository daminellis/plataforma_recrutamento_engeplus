import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
export function tempoPostado(): string {
    const now = new Date();
    const minutes = differenceInMinutes(now, this.dataPostagem);
    if (minutes < 60) {
      return `Há ${minutes} minutos`;
    }
    const hours = differenceInHours(now, this.dataPostagem);
    if (hours < 24) {
      return `Há ${hours} horas`;
    }
    const days = differenceInDays(now, this.dataPostagem);
    return `Há ${days} dias`;
  }