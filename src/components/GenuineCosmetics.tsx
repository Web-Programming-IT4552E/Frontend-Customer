import Image from 'next/image';
import React from 'react';

import bannerLeftImg from '@/assets/images/banner-left.png';

const GenuineCosmetics = () => {
  return (
    <div className='grid gap-10 px-4 sm:grid-cols-2 sm:px-8 sm:pt-32 sm:pb-4 xl:px-32 xl:pb-14'>
      <Image
        src={bannerLeftImg}
        alt='banner left image'
        className='mt-[66px] sm:mt-40 lg:mt-10 xl:mt-0'
      />
      <div className='mt-2 sm:mt-[-100px] sm:pt-10 lg:mt-[-100px] xl:mt-0 xl:pb-10'>
        <div className='mb-14'>
          <h1 className='mb-4 font-secondary-font text-[30px] text-[#333] sm:text-[39px] lg:text-[54px]'>
            #Genuine Cosmetics
          </h1>
          <p className='text-[24px] text-[#999]'>Customers Satisfaction</p>
        </div>
        <div>
          <div className='mb-12 text-[#666]'>
            <h1 className='mb-6 text-[25px] font-semibold'>
              <span className='block'>Organic cream</span>
              <span className='mask-img mt-4 block h-3 w-[60px] bg-primary-color'></span>
            </h1>
            <p className='text-[15px] leading-7'>
              Organic cream is a natural and wholesome skincare product designed to provide
              nourishment and hydration to the skin. Made from carefully sourced organic
              ingredients, this cream aims to deliver the best possible benefits while avoiding
              harmful chemicals.
            </p>
          </div>

          <div className='mb-12 text-[#666]'>
            <h1 className='mb-5 text-[25px] font-semibold'>
              <span className='block'>Natural extracts</span>
              <span className='mask-img mt-4 block h-3 w-[60px] bg-primary-color'></span>
            </h1>
            <p className='text-[15px] leading-7'>
              Harness the power of nature with skincare products enriched with natural extracts.
              These extracts are derived from various plants and botanicals, carefully chosen for
              their beneficial properties. Packed with vitamins, antioxidants, and minerals, natural
              extracts offer a multitude of skincare benefits.
            </p>
          </div>

          <div className='mb-12 text-[#666]'>
            <h1 className='mb-6 text-[25px] font-semibold'>
              <span className='block'>Quality assurance</span>
              <span className='mask-img mt-4 block h-3 w-[60px] bg-primary-color'></span>
            </h1>
            <p className='text-[15px] leading-7'>
              Our commitment to quality assurance is at the heart of everything we do. From the
              sourcing of premium ingredients to the meticulous manufacturing process, we adhere to
              the highest industry standards to ensure the excellence of our products. Each step of
              the production is carefully monitored and tested to meet rigorous quality benchmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenuineCosmetics;
