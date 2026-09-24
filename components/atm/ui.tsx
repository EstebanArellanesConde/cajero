"use client"

import type { ReactNode } from "react"
import { CheckCircle2, XCircle } from "lucide-react"

type Variant = "primary" | "secondary" | "danger" | "neutral"

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 border-transparent shadow-sm",
  secondary:
    "bg-white text-blue-800 hover:bg-blue-50 active:bg-blue-100 border-blue-200",
  danger:
    "bg-white text-red-700 hover:bg-red-50 active:bg-red-100 border-red-200",
  neutral:
    "bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 border-slate-200",
}

export function ATMButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-3 rounded-2xl border px-6 py-5 text-lg font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function ScreenTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-pretty text-center text-2xl font-bold text-slate-900 sm:text-3xl">
      {children}
    </h2>
  )
}

export function Message({
  type,
  children,
}: {
  type: "success" | "error"
  children: ReactNode
}) {
  const isSuccess = type === "success"
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-base font-medium ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="size-6 shrink-0" aria-hidden="true" />
      ) : (
        <XCircle className="size-6 shrink-0" aria-hidden="true" />
      )}
      <span>{children}</span>
    </div>
  )
}
