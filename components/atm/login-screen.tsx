"use client"

import { useState } from "react"
import { LogIn, Landmark } from "lucide-react"
import { ATMButton, Message } from "./ui"
import { NIP_CORRECTO } from "@/lib/atm"

export function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [nip, setNip] = useState("")
  const [error, setError] = useState("")

  function handleChange(value: string) {
    // Solo dígitos, máximo 4
    const soloNumeros = value.replace(/\D/g, "").slice(0, 4)
    setNip(soloNumeros)
    if (error) setError("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (nip.length === 0) {
      setError("Ingresa tu NIP para continuar.")
      return
    }
    if (nip === NIP_CORRECTO) {
      onSuccess()
    } else {
      setError("NIP incorrecto. Inténtalo nuevamente.")
      setNip("")
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-700 text-white">
          <Landmark className="size-8" aria-hidden="true" />
        </div>
        <h1 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          Cajero Automático
        </h1>
        <p className="text-center text-base text-slate-500">
          Ingresa tu NIP para acceder a tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="nip" className="text-base font-semibold text-slate-700">
            NIP
          </label>
          <input
            id="nip"
            name="nip"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            placeholder="••••"
            value={nip}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-2xl tracking-[0.5em] text-slate-900 placeholder:tracking-[0.5em] placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-200"
            aria-describedby={error ? "nip-error" : undefined}
          />
        </div>

        {error && (
          <div id="nip-error">
            <Message type="error">{error}</Message>
          </div>
        )}

        <ATMButton type="submit" variant="primary" className="w-full">
          <LogIn className="size-6" aria-hidden="true" />
          Ingresar
        </ATMButton>
      </form>
    </div>
  )
}
