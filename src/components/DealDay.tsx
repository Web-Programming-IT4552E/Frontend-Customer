import React from 'react';

import dealDayImg from '@/assets/images/bg-deal-day.jpg';
import Button from '@/components/common/Button';

const DealDay = () => {
  return (
    <div
      id="deal-day"
      style={{ backgroundImage: `url(${dealDayImg.src})` }}
      className="flex min-h-[667px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat sm:min-h-[627px] lg:min-h-[647px]"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-0 font-secondary-font text-[40px] text-[#333] sm:text-[50px] lg:text-[60px]">
          Deal Of The Day
        </h1>
        <span className="mask-img mt-5 block h-4 w-[172px] bg-white"></span>
      </div>
      <div className="mt-12 mb-14 flex flex-wrap items-center justify-center gap-8 sm:mt-16 sm:mb-[78px] sm:gap-16">
        <div className="time-box">
          <span className="block py-2 text-[70px] font-semibold">0</span>
          <span className="mt-[2px] block text-[17px]">Hours</span>
        </div>
        <div className="time-box">
          <span className="block py-2 text-[70px] font-semibold">0</span>
          <span className="mt-[2px] block text-[17px]">Mins</span>
        </div>
        <div className="time-box">
          <span className="block py-2 text-[70px] font-semibold">0</span>
          <span className="mt-[2px] block text-[17px]">Secs</span>
        </div>
      </div>
      <Button secondary>SHOW NOW</Button>
    </div>
  );
};

export default DealDay;
