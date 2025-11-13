import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='py-40 flex flex-col items-center md:min-h-[calc(100vh-210px)] min-h-[calc(100vh-220px)] justify-center'>
      <div className='text-center space-y-6'>
        <div className='relative'>
          <h1 className='text-9xl font-bold dark:text-gray-200 text-gray-900'>
            404

          </h1>
          <div className='absolute -bottom-4 left-1/2 transform w-24 h-1 bg-red-500'></div>
        </div>
        <h2 className='text-2xl font-semibold dark:text-gray-400 text-gray-700'>Page Not Found</h2>
        <p className='text-gray-500 max-w-md mx-auto'>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
