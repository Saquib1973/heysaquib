import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='py-40 flex flex-col items-center justify-center bg-gray-50'>
      <div className='text-center space-y-6'>
        <div className='relative'>
          <h1 className='text-9xl font-bold text-gray-900'>
            404
          </h1>
          <div className='absolute -bottom-4 left-1/2 transform w-24 h-1 bg-red-500'></div>
        </div>
        <h2 className='text-2xl font-semibold text-gray-700'>Page Not Found</h2>
        <p className='text-gray-500 max-w-md mx-auto'>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
