import React from 'react'

const Next = ({className}:{className?:string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-8 p-1 md:size-20 active:scale-90 transition text-gray-2 hover:text-black-0 py-2 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
      />
    </svg>
  )
}

export default Next
