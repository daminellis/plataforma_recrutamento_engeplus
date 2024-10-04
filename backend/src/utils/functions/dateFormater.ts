export function dateFormater(dataBrasileira: string): string {
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!regexData.test(dataBrasileira)) {
    throw new Error('Formato de data inválido. Utilize dd/mm/aaaa');
  }

  // Separa os componentes da data
  const [dia, mes, ano] = dataBrasileira.split('/');

  // Reconstroi a data no formato americano
  const dataAmericana = `${ano}-${mes}-${dia}`;

  return (dataAmericana);
}