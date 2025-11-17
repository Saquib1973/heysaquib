"use client"

export default function ContextWrapper({ children }: { children: React.ReactNode }) {

  return (
    <div>

      {children}
    </div>
  )
}
