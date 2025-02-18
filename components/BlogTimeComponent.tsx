"use client"
import { useEffect, useState } from "react"
type Props = {
  readonly date: string
}
export default function BlogTimeComponent({ date }: Props) {
  const [time, setTime] = useState<string>("")
  useEffect(() => {
    setTime(
      new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    )
  }, [date])

  return <>{time}</>
}