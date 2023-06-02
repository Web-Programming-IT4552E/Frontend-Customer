import React from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image';

export interface IBannerItem {
  title: string,
  description: string,
  imgUrl: StaticImageData
}

const BannerItem = ({title, description, imgUrl}: IBannerItem) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl.src})`,
      }}
      className="bg-cover bg-center bg-no-repeat pt-[53%] relative"
    >
      <div className='absolute top-0 bottom-0 left-32 w-[44%] flex flex-col justify-center text-center'>
        <h1 className='text-[90px] font-secondary-font text-[#333] mb-8'>{title}</h1>
        <p className='text-[25px] text-[#B8B8B8]'>{description}</p>
      </div>
    </div>
  )
}

export default BannerItem