import currency from "currency.js";

export function convertToCurrency(string: string) {
  return currency(string.replace(",", "."), { symbol: "" }).format();
}
