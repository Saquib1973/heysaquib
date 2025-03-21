import React from 'react'

const page = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-1 p-1">
        <p className="text-gray-0">text-gray-0</p>
        <p className="text-gray-1">text-gray-1</p>
        <p className="text-gray-2">text-gray-2</p>
        <p className="text-white-0">text-white-0</p>
        <p className="text-white-1">text-white-1</p>
        <p className="text-white-2">text-white-2</p>
        <p className="text-yellow-0">text-yellow-0</p>
        <p className="text-yellow-1">text-yellow-1</p>
        <p className="text-yellow-2">text-yellow-2</p>
        <p className="text-yellow-3">text-yellow-3</p>
        <p className="text-yellow-4">text-yellow-4</p>
        <p className="text-black-0">text-black-0</p>
        <p className="text-black-0.5">text-black-0.5</p>
        <p className="text-black-1">text-black-1</p>
      </div>
      <div className="flex flex-wrap gap-1">
        <div className="h-20 w-20 border m-1 bg-gray-0" />
        <div className="h-20 w-20 border m-1 bg-gray-1" />
        <div className="h-20 w-20 border m-1 bg-gray-2" />
        <div className="h-20 w-20 border m-1 bg-white-0" />
        <div className="h-20 w-20 border m-1 bg-white-1" />
        <div className="h-20 w-20 border m-1 bg-white-2" />
        <div className="h-20 w-20 border m-1 bg-yellow-0" />
        <div className="h-20 w-20 border m-1 bg-yellow-1" />
        <div className="h-20 w-20 border m-1 bg-yellow-2" />
        <div className="h-20 w-20 border m-1 bg-yellow-3" />
        <div className="h-20 w-20 border m-1 bg-yellow-4" />
        <div className="h-20 w-20 border m-1 bg-black-0" />
        <div className="h-20 w-20 border m-1 bg-black-1" />
        <div className="h-20 w-20 border m-1 bg-black-2" />
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='happymonkey-h1'>happymonkey-h1</h1>
        <h1 className='amiko-h1'>amiko-h1</h1>
        <h1 className='rampart-h1'>rampart-h1</h1>
        <h1 className='neue-h1'>neue-h1</h1>
        <h1 className='happymonkey-h2'>happymonkey-h2</h1>
        <h1 className='amiko-h2'>amiko-h2</h1>
        <h1 className='rampart-h2'>rampart-h2</h1>
        <h1 className='neue-h2'>neue-h2</h1>
        <h1 className='amiko-p'>amiko-p : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, dolore.</h1>
        <h1 className='happymonkey-p'>happymonkey-p : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, dolore.</h1>
        <h1 className='neue-p'>neue-p : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, dolore.</h1>
      </div>
    </div>
  )
}

export default page
