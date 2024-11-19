export function dateFormater(dataBrasileira: string): Date {
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!regexData.test(dataBrasileira)) {
    throw new Error('Formato de data inválido. Utilize dd/mm/aaaa');
  }

  const [dia, mes, ano] = dataBrasileira.split('/');

  const dataLocal = new Date(Number(ano), Number(mes) - 1, Number(dia), 0, 0, 0);

  return dataLocal;
}