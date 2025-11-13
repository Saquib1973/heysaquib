import Image from 'next/image'
import React from 'react'
import faceImage from "../public/assets/face-image.jpg"
const ImageSection = () => {
  return (
    <div><Image src={faceImage} className="w-full" width={1080} height={1200} alt={"face image"} /></div>
  )
}

export default ImageSection