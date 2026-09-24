"use client"

import { Wallet, Banknote, ArrowLeftRight, LogOut } from "lucide-react"
import { ATMButton, ScreenTitle } from "./ui"
import type { Screen } from "@/lib/atm"

export function MenuScreen({
  onNavigate,
  onLogout,
}: {
  onNavigate: (screen: Screen) => void
  onLogout: () => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <ScreenTitle>Bienvenido</ScreenTitle>
        <p className="text-center text-base text-slate-500">
          Selecciona la operación que deseas realizar
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ATMButton
          variant="secondary"
          onClick={() => onNavigate("balance")}
          className="min-h-28 flex-col"
        >
          <Wallet className="size-8" aria-hidden="true" />
          Consultar saldo
        </ATMButton>

        <ATMButton
          variant="secondary"
          onClick={() => onNavigate("withdraw")}
          className="min-h-28 flex-col"
        >
          <Banknote className="size-8" aria-hidden="true" />
          Retirar efectivo
        </ATMButton>

        <ATMButton
          variant="secondary"
          onClick={() => onNavigate("deposit")}
          className="min-h-28 flex-col"
        >
          <ArrowLeftRight className="size-8" aria-hidden="true" />
          Depositar a otra cuenta
        </ATMButton>

        <ATMButton
          variant="danger"
          onClick={onLogout}
          className="min-h-28 flex-col"
        >
          <LogOut className="size-8" aria-hidden="true" />
          Cerrar sesión
        </ATMButton>
      </div>
    </div>
  )
}
