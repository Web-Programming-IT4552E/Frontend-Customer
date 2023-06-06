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
      className="bg-cover bg-center bg-no-repeat pt-[53%] relative"
    >
      <div className='absolute top-0 bottom-0 left-32 w-[44%] flex flex-col justify-center items-center text-center'>
        <h1 className='text-[90px] font-secondary-font text-[#333] mb-8'>{firstTitle} <br /> {restTitle}</h1>
        <p className='text-[25px] text-[#B8B8B8] mb-11'>{description}</p>
        <Button primary>SHOP NOW</Button>
      </div>
    </div>
  )
}

export default BannerItem