export const formatSalary = (salary: string) => {
  const salaryNumber = parseInt(salary);
  if (salaryNumber >= 1000) {
    return (salaryNumber / 1000).toFixed(0);
  }
  return salaryNumber.toString();
};

export const formatSalaryMinMax = (min: string, max: string) => {
  return `R$ ${formatSalary(min)}K - ${formatSalary(max)}K`;
};
