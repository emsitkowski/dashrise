import currency from "currency.js";

export function convertToCurrency(string: string) {
  return currency(string, { symbol: "" }).format({ separator: "," });
}

export function revertCurrencyToNumber(string: string) {
  if (string.includes(",")) {
    return Number(string.replace(",", ""));
  } else {
    return Number(string);
  }
}
