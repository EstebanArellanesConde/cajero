"use client"

import { Wallet, ArrowLeft, LogOut } from "lucide-react"
import { ATMButton, ScreenTitle } from "./ui"
import { formatMXN } from "@/lib/atm"

export function BalanceScreen({
  balance,
  onBack,
  onLogout,
}: {
  balance: number
  onBack: () => void
  onLogout: () => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <ScreenTitle>Saldo disponible</ScreenTitle>

      <div className="flex flex-col items-center gap-3 rounded-3xl border border-blue-100 bg-blue-50 px-6 py-10">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-700 text-white">
          <Wallet className="size-7" aria-hidden="true" />
        </div>
        <p className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl">
          {formatMXN(balance)}
        </p>
        <p className="text-sm text-slate-500">Saldo actual de tu cuenta</p>
      </div>

      <div className="flex flex-col gap-4">
        <ATMButton variant="primary" onClick={onBack}>
          <ArrowLeft className="size-6" aria-hidden="true" />
          Volver al menú principal
        </ATMButton>
        <ATMButton variant="danger" onClick={onLogout}>
          <LogOut className="size-6" aria-hidden="true" />
          Cerrar sesión
        </ATMButton>
      </div>
    </div>
  )
}
