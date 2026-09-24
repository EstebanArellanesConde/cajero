"use client"

import { useState } from "react"
import { Banknote, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react"
import { ATMButton, ScreenTitle, Message } from "./ui"
import { formatMXN } from "@/lib/atm"

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000]

const compactMXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

type Receipt = {
  amount: number
  previous: number
  remaining: number
}

export function WithdrawScreen({
  balance,
  onWithdraw,
  onBack,
}: {
  balance: number
  onWithdraw: (amount: number) => void
  onBack: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState(false)
  const [customValue, setCustomValue] = useState("")
  const [error, setError] = useState("")
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  function reset() {
    setSelected(null)
    setCustom(false)
    setCustomValue("")
    setError("")
    setReceipt(null)
  }

  function selectQuick(amount: number) {
    setSelected(amount)
    setCustom(false)
    setCustomValue("")
    setError("")
  }

  function selectCustom() {
    setCustom(true)
    setSelected(null)
    setError("")
  }

  function handleWithdraw() {
    setError("")
    const amount = custom ? Number(customValue) : selected

    if (!amount || Number.isNaN(amount)) {
      setError("Selecciona o escribe una cantidad válida.")
      return
    }
    if (amount <= 0) {
      setError("La cantidad debe ser mayor a $0.00 MXN.")
      return
    }
    if (amount > balance) {
      setError("Saldo insuficiente.")
      return
    }

    const previous = balance
    onWithdraw(amount)
    setReceipt({ amount, previous, remaining: previous - amount })
  }

  if (receipt) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-green-600 text-white">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </div>
          <ScreenTitle>Retiro realizado correctamente</ScreenTitle>
        </div>

        <dl className="flex flex-col divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Cantidad retirada</dt>
            <dd className="text-lg font-bold text-slate-900">
              {formatMXN(receipt.amount)}
            </dd>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Saldo anterior</dt>
            <dd className="font-semibold text-slate-700">
              {formatMXN(receipt.previous)}
            </dd>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <dt className="text-slate-500">Saldo restante</dt>
            <dd className="text-lg font-bold text-blue-800">
              {formatMXN(receipt.remaining)}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-4">
          <ATMButton variant="primary" onClick={reset}>
            <RotateCcw className="size-6" aria-hidden="true" />
            Realizar otra operación
          </ATMButton>
          <ATMButton variant="neutral" onClick={onBack}>
            <ArrowLeft className="size-6" aria-hidden="true" />
            Volver al menú principal
          </ATMButton>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <ScreenTitle>Retiro de efectivo</ScreenTitle>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-center">
        <span className="text-sm text-slate-500">Saldo disponible: </span>
        <span className="font-bold text-blue-900">{formatMXN(balance)}</span>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-base font-semibold text-slate-700">
          Selecciona una cantidad
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {QUICK_AMOUNTS.map((amount) => (
            <ATMButton
              key={amount}
              variant={selected === amount ? "primary" : "secondary"}
              onClick={() => selectQuick(amount)}
            >
              {compactMXN.format(amount)}
            </ATMButton>
          ))}
          <ATMButton
            variant={custom ? "primary" : "secondary"}
            onClick={selectCustom}
          >
            Otra cantidad
          </ATMButton>
        </div>
      </div>

      {custom && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="custom-amount"
            className="text-base font-semibold text-slate-700"
          >
            Monto a retirar
          </label>
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-200">
            <span className="text-xl font-semibold text-slate-400">$</span>
            <input
              id="custom-amount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={customValue}
              onChange={(e) => {
                setCustomValue(e.target.value.replace(/[^\d.]/g, ""))
                if (error) setError("")
              }}
              className="w-full bg-transparent px-3 py-4 text-xl text-slate-900 placeholder:text-slate-300 focus:outline-none"
            />
            <span className="text-base font-medium text-slate-400">MXN</span>
          </div>
        </div>
      )}

      {error && <Message type="error">{error}</Message>}

      <div className="flex flex-col gap-4">
        <ATMButton variant="primary" onClick={handleWithdraw}>
          <Banknote className="size-6" aria-hidden="true" />
          Retirar
        </ATMButton>
        <ATMButton variant="neutral" onClick={onBack}>
          <ArrowLeft className="size-6" aria-hidden="true" />
          Volver al menú principal
        </ATMButton>
      </div>
    </div>
  )
}
