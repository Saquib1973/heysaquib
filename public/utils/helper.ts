
export const sendEmail = () => {
  const subject = encodeURIComponent('Feedback or Inquiry')
  const body = encodeURIComponent(
    'Dear Saquib,\n\nI wanted to reach out regarding...'
  )
  const mailtoLink = `mailto:saquibali353@gmail.com?subject=${subject}&body=${body}`
  window.location.href = mailtoLink
}

export const getDateHelper = () => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const formattedDate = date.toLocaleDateString('en-US', options)

  const dateParts = formattedDate.split(', ')

  return `${dateParts[0].split(" ")[1]} ${dateParts[0].split(" ")[0]} ${
    dateParts[1]
  }`

}



