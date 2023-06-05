import React from 'react'
import Image from 'next/image'

import bannerLeftImg from "@/assets/images/banner-left.png"

const GenuineCosmetics = () => {
  return (
    <div className='px-32 pt-32 pb-14 grid grid-cols-2 gap-10'>
      <Image src={bannerLeftImg} alt='banner left image' className=''/>
      <div className='py-10'>
        <div className='mb-14'>
          <h1 className='font-secondary-font text-[54px] text-[#333] mb-4'>#Genuine Cosmetics</h1>
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