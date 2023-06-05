import React from 'react'
import type { StaticImageData } from 'next/image';

import Button from './common/Button';

export interface IBannerItem {
  title: string,
  description: string,
  imgUrl: StaticImageData
}

const BannerItem = ({title, description, imgUrl}: IBannerItem) => {
  const firstTitle = title.split(" ", 1)[0];
  const restTitle = title.slice(firstTitle?.length);
  
  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl.src})`,
      }}
      className="bg-cover bg-center bg-no-repeat relative pt-[151%] sm:pt-[72%] lg:pt-[53%]"
    >
      <div 
        className='absolute top-0 bottom-0 left-0 w-[100%] flex flex-col justify-center items-center text-center sm:w-[44%] sm:left-24 lg:left-32'
      >
        <h1 className='text-[66px] font-secondary-font text-[#333] mb-8 lg:text-[90px]'>{firstTitle} <br /> {restTitle}</h1>
        <p className='text-[22px] text-[#B8B8B8] mb-11 lg:text-[25px]'>{description}</p>
        <Button primary>SHOP NOW</Button>
      </div>
    </div>
  )
}

export default BannerItem