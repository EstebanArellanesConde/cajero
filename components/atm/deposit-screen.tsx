"use client"

import { useState } from "react"
import {
  ArrowLeftRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  X,
} from "lucide-react"
import { ATMButton, ScreenTitle, Message } from "./ui"
import { formatMXN } from "@/lib/atm"

type Step = "form" | "confirm" | "success"

type Receipt = {
  account: string
  amount: number
  remaining: number
}

export function DepositScreen({
  balance,
  onDeposit,
  onBack,
}: {
  balance: number
  onDeposit: (amount: number) => void
  onBack: () => void
}) {
  const [step, setStep] = useState<Step>("form")
  const [account, setAccount] = useState("")
  const [amountValue, setAmountValue] = useState("")
  const [error, setError] = useState("")
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  const amount = Number(amountValue)

  function handleContinue() {
    setError("")
    if (account.length !== 10) {
      setError("La cuenta destino debe contener exactamente 10 números.")
      return
    }
    if (!amountValue || Number.isNaN(amount) || amount <= 0) {
      setError("La cantidad debe ser mayor a $0.00 MXN.")
      return
    }
    if (amount > balance) {
      setError("Saldo insuficiente para realizar la operación.")
      return
    }
    setStep("confirm")
  }

  function handleConfirm() {
    // Revalidación de seguridad antes de aplicar la operación
    if (amount <= 0 || amount > balance || account.length !== 10) {
      setError("Saldo insuficiente para realizar la operación.")
      setStep("form")
      return
    }
    onDeposit(amount)
    setReceipt({ account, amount, remaining: balance - amount })
    setStep("success")
  }

  if (step === "success" && receipt) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-green-600 text-white">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </div>
          <ScreenTitle>Depósito realizado correctamente</ScreenTitle>
        </div>

        <dl className="flex flex-col divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Cuenta destino</dt>
            <dd className="font-mono text-lg font-bold text-slate-900">
              {receipt.account}
            </dd>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Cantidad depositada</dt>
            <dd className="text-lg font-bold text-slate-900">
              {formatMXN(receipt.amount)}
            </dd>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Saldo restante</dt>
            <dd className="text-lg font-bold text-blue-800">
              {formatMXN(receipt.remaining)}
            </dd>
          </div>
        </dl>

        <ATMButton variant="primary" onClick={onBack}>
          <ArrowLeft className="size-6" aria-hidden="true" />
          Volver al menú principal
        </ATMButton>
      </div>
    )
  }

  if (step === "confirm") {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-700 text-white">
            <ShieldCheck className="size-8" aria-hidden="true" />
          </div>
          <ScreenTitle>Confirma los datos</ScreenTitle>
        </div>

        <dl className="flex flex-col divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Cuenta destino</dt>
            <dd className="font-mono text-lg font-bold text-slate-900">
              {account}
            </dd>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Cantidad a depositar</dt>
            <dd className="text-lg font-bold text-slate-900">
              {formatMXN(amount)}
            </dd>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Saldo actual</dt>
            <dd className="font-semibold text-slate-700">
              {formatMXN(balance)}
            </dd>
          </div>
        </dl>

        {error && <Message type="error">{error}</Message>}

        <div className="flex flex-col gap-4">
          <ATMButton variant="primary" onClick={handleConfirm}>
            <CheckCircle2 className="size-6" aria-hidden="true" />
            Confirmar depósito
          </ATMButton>
          <ATMButton variant="danger" onClick={() => setStep("form")}>
            <X className="size-6" aria-hidden="true" />
            Cancelar
          </ATMButton>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <ScreenTitle>Depósito a otra cuenta</ScreenTitle>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-center">
        <span className="text-sm text-slate-500">Saldo disponible: </span>
        <span className="font-bold text-blue-900">{formatMXN(balance)}</span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="account"
            className="text-base font-semibold text-slate-700"
          >
            Número de cuenta destino
          </label>
          <input
            id="account"
            type="text"
            inputMode="numeric"
            placeholder="10 dígitos"
            value={account}
            onChange={(e) => {
              setAccount(e.target.value.replace(/\D/g, "").slice(0, 10))
              if (error) setError("")
            }}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-mono text-xl tracking-widest text-slate-900 placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
          <span className="text-sm text-slate-400">
            {account.length}/10 dígitos
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="deposit-amount"
            className="text-base font-semibold text-slate-700"
          >
            Cantidad a depositar
          </label>
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-200">
            <span className="text-xl font-semibold text-slate-400">$</span>
            <input
              id="deposit-amount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={amountValue}
              onChange={(e) => {
                setAmountValue(e.target.value.replace(/[^\d.]/g, ""))
                if (error) setError("")
              }}
              className="w-full bg-transparent px-3 py-4 text-xl text-slate-900 placeholder:text-slate-300 focus:outline-none"
            />
            <span className="text-base font-medium text-slate-400">MXN</span>
          </div>
        </div>
      </div>

      {error && <Message type="error">{error}</Message>}

      <div className="flex flex-col gap-4">
        <ATMButton variant="primary" onClick={handleContinue}>
          <ArrowLeftRight className="size-6" aria-hidden="true" />
          Continuar
        </ATMButton>
        <ATMButton variant="neutral" onClick={onBack}>
          <ArrowLeft className="size-6" aria-hidden="true" />
          Volver al menú principal
        </ATMButton>
      </div>
    </div>
  )
}
