export function formatMoney(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencySign: 'accounting',
  }).format(amount);
}