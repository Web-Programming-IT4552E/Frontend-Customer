import React from 'react'
import Image from 'next/image'

import bannerLeftImg from "@/assets/images/banner-left.png"

const GenuineCosmetics = () => {
  return (
    <div className='px-4 grid gap-10 sm:grid-cols-2 sm:pt-32 sm:px-8 sm:pb-4 xl:pb-14 xl:px-32'>
      <Image src={bannerLeftImg} alt='banner left image' className='mt-[66px] sm:mt-40 lg:mt-10 xl:mt-0'/>
      <div className='mt-2 sm:pt-10 sm:mt-[-100px] lg:mt-[-100px] xl:pb-10 xl:mt-0'>
        <div className='mb-14'>
          <h1 className='font-secondary-font text-[30px] text-[#333] mb-4 sm:text-[39px] lg:text-[54px]'>#Genuine Cosmetics</h1>
          <p className='text-[24px] text-[#999]'>Customers Satisfaction</p>
        </div>
        <div>
          <div className='text-[#666] mb-12'>
            <h1 className='text-[25px] font-semibold mb-6'>
              <span className='block'>Organic cream</span>
              <span className='block mt-4 mask-img w-[60px] h-3 bg-primary-color'></span>
            </h1>
            <p className='text-[15px] leading-7'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
              voluptatem quia voluptas.
            </p>
          </div>

          <div className='text-[#666] mb-12'>
            <h1 className='text-[25px] font-semibold mb-5'>
              <span className='block'>Natural extracts</span>
              <span className='block mt-4 mask-img w-[60px] h-3 bg-primary-color'></span>
            </h1>
            <p className='text-[15px] leading-7'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
              voluptatem quia voluptas.
            </p>
          </div>

          <div className='text-[#666] mb-12'>
            <h1 className='text-[25px] font-semibold mb-6'>
              <span className='block'>Quality assurance</span>
              <span className='block mt-4 mask-img w-[60px] h-3 bg-primary-color'></span>
            </h1>
            <p className='text-[15px] leading-7'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
              voluptatem quia voluptas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenuineCosmetics