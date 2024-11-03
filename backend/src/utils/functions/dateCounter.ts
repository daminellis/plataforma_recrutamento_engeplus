import { DateTime } from "ts-luxon";
import { Timestamp } from 'typeorm';

export function tempoPostado(dataPostagem: Timestamp): string {
    if (!dataPostagem) {
        return "Data de postagem inválida";
    }

    const agora = DateTime.now();
    const postagem = DateTime.fromJSDate(new Date(dataPostagem as unknown as string));

    const diffInMinutes = agora.diff(postagem, 'minutes').minutes;
    const diffInHours = agora.diff(postagem, 'hours').hours;
    const diffInDays = agora.diff(postagem, 'days').days;
    const diffInWeeks = agora.diff(postagem, 'weeks').weeks;
    const diffInMonths = agora.diff(postagem, 'months').months;
    const diffInYears = agora.diff(postagem, 'years').years;

    if (isNaN(diffInMinutes) || isNaN(diffInHours) || isNaN(diffInDays) || isNaN(diffInWeeks) || isNaN(diffInMonths) || isNaN(diffInYears)) {
        return "Erro ao calcular o tempo de postagem";
    }

    if (diffInMinutes < 60) {
        return `Há ${Math.floor(diffInMinutes)} minutos`;
    } else if (diffInHours < 24) {
        return `Há ${Math.floor(diffInHours)} horas`;
    } else if (diffInDays < 7) {
        return `Há ${Math.floor(diffInDays)} dias`;
    } else if (diffInWeeks < 4) {
        return `Há ${Math.floor(diffInWeeks)} semanas`;
    } else if (diffInMonths < 12) {
        return `Há ${Math.floor(diffInMonths)} meses`;
    } else {
        return `Há ${Math.floor(diffInYears)} anos`;
    }
}