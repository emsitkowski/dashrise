import currency from "currency.js";

export function convertToCurrency(value: string | number) {
  return currency(value, { symbol: "$" }).format({ separator: "," });
}

export function revertCurrencyToNumber(string: string) {
  if (string.includes(",")) {
    return Number(string.replace(",", ""));
  } else {
    return Number(string);
  }
}
