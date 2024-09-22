import { Transform } from 'class-transformer';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const DateTransformer = () => {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date(), { locale: ptBR });
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
      }
      return parsedDate;
    }
    return value;
  }, { toClassOnly: true });
};