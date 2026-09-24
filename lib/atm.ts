export const NIP_CORRECTO = "8420"
export const SALDO_INICIAL = 10000

const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatMXN(amount: number): string {
  return `${formatter.format(amount)} MXN`
}

export type Screen = "login" | "menu" | "balance" | "withdraw" | "deposit"
