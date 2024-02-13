export function getCurrencyFormat(value, currency = "rub") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
  }).format(value);
}
