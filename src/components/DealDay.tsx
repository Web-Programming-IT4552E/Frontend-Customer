import React from 'react'

import Button from '@/components/common/Button'
import dealDayImg from '@/assets/images/bg-deal-day.jpg'

const DealDay = () => {
  return (
    <div 
      id='deal-day'
      style={{ backgroundImage: `url(${dealDayImg.src})`}} 
      className='bg-cover bg-center bg-no-repeat min-h-[667px] flex flex-col items-center justify-center sm:min-h-[627px] lg:min-h-[647px]'
    >
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[40px] text-[#333] font-secondary-font mb-0 sm:text-[50px] lg:text-[60px]'>Deal Of The Day</h1>
        <span className='block mt-5 mask-img w-[172px] h-4 bg-white'></span>
      </div>
      <div className='mt-12 mb-14 flex flex-wrap items-center justify-center gap-8 sm:gap-16 sm:mt-16 sm:mb-[78px]'>
        <div className='time-box'>
          <span className='block text-[70px] font-semibold py-2'>0</span>
          <span className='block text-[17px] mt-[2px]'>Hours</span>
        </div>
        <div className='time-box'>
          <span className='block text-[70px] font-semibold py-2'>0</span>
          <span className='block text-[17px] mt-[2px]'>Mins</span>
        </div>
        <div className='time-box'>
          <span className='block text-[70px] font-semibold py-2'>0</span>
          <span className='block text-[17px] mt-[2px]'>Secs</span>
        </div>
      </div>
      <Button secondary>SHOW NOW</Button>
    </div>
  )
}

export default DealDay