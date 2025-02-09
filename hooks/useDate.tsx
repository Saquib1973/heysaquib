import { useState, useEffect } from 'react'

export const useDateHelper = () => {
  const [formattedDate, setFormattedDate] = useState<string>('')

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    const formattedDateStr = date.toLocaleDateString('en-US', options)
    const dateParts = formattedDateStr.split(', ')

    const finalDate = `${dateParts[0].split(' ')[1]} ${
      dateParts[0].split(' ')[0]
    } ${dateParts[1]}`
    setFormattedDate(finalDate)
  }, [])

  return formattedDate
}
