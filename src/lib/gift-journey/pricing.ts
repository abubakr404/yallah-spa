/** 15% VAT as shown on Figma review invoice. */
export const VAT_RATE = 0.15;

export function splitInclusiveTax(totalSar: number) {
  const subtotalSar = Number((totalSar / (1 + VAT_RATE)).toFixed(2));
  const taxSar = Number((totalSar - subtotalSar).toFixed(2));
  return { subtotalSar, taxSar, totalSar };
}

export function formatSarExact(amount: number) {
  return `${amount.toFixed(2)} ر.س`;
}
