"use client"

import { useState } from "react"
import { Landmark } from "lucide-react"
import { SALDO_INICIAL, type Screen } from "@/lib/atm"
import { LoginScreen } from "./login-screen"
import { MenuScreen } from "./menu-screen"
import { BalanceScreen } from "./balance-screen"
import { WithdrawScreen } from "./withdraw-screen"
import { DepositScreen } from "./deposit-screen"

export function ATMMachine() {
  const [authenticated, setAuthenticated] = useState(false)
  const [screen, setScreen] = useState<Screen>("login")
  const [balance, setBalance] = useState(SALDO_INICIAL)

  function login() {
    setAuthenticated(true)
    setScreen("menu")
  }

  function logout() {
    setAuthenticated(false)
    setScreen("login")
  }

  function goToMenu() {
    setScreen("menu")
  }

  function withdraw(amount: number) {
    setBalance((prev) => prev - amount)
  }

  function deposit(amount: number) {
    setBalance((prev) => prev - amount)
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Marco del cajero */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* Barra superior estilo ATM */}
          <header className="flex items-center gap-3 bg-blue-900 px-6 py-4 text-white">
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/15">
              <Landmark className="size-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">
                Banco Simulado
              </span>
              <span className="text-xs text-blue-200">
                Cajero Automático · Demo
              </span>
            </div>
            <span
              className="ml-auto flex items-center gap-1.5 text-xs text-blue-200"
              aria-live="polite"
            >
              <span
                className={`size-2 rounded-full ${
                  authenticated ? "bg-green-400" : "bg-slate-400"
                }`}
                aria-hidden="true"
              />
              {authenticated ? "En sesión" : "Inactivo"}
            </span>
          </header>

          {/* Pantalla */}
          <div className="px-6 py-8 sm:px-8">
            {screen === "login" && <LoginScreen onSuccess={login} />}
            {screen === "menu" && (
              <MenuScreen onNavigate={setScreen} onLogout={logout} />
            )}
            {screen === "balance" && (
              <BalanceScreen
                balance={balance}
                onBack={goToMenu}
                onLogout={logout}
              />
            )}
            {screen === "withdraw" && (
              <WithdrawScreen
                balance={balance}
                onWithdraw={withdraw}
                onBack={goToMenu}
              />
            )}
            {screen === "deposit" && (
              <DepositScreen
                balance={balance}
                onDeposit={deposit}
                onBack={goToMenu}
              />
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Simulación académica. No se conecta a servicios bancarios reales.
        </p>
      </div>
    </main>
  )
}
