import Image from 'next/image';
import React from 'react';

import bannerLeftImg from '@/assets/images/banner-left.png';

const GenuineCosmetics = () => {
  return (
    <div className="grid gap-10 px-4 sm:grid-cols-2 sm:px-8 sm:pt-32 sm:pb-4 xl:px-32 xl:pb-14">
      <Image
        src={bannerLeftImg}
        alt="banner left image"
        className="mt-[66px] sm:mt-40 lg:mt-10 xl:mt-0"
      />
      <div className="mt-2 sm:mt-[-100px] sm:pt-10 lg:mt-[-100px] xl:mt-0 xl:pb-10">
        <div className="mb-14">
          <h1 className="mb-4 font-secondary-font text-[30px] text-[#333] sm:text-[39px] lg:text-[54px]">
            #Genuine Cosmetics
          </h1>
          <p className="text-[24px] text-[#999]">Customers Satisfaction</p>
        </div>
        <div>
          <div className="mb-12 text-[#666]">
            <h1 className="mb-6 text-[25px] font-semibold">
              <span className="block">Organic cream</span>
              <span className="mask-img mt-4 block h-3 w-[60px] bg-primary-color"></span>
            </h1>
            <p className="text-[15px] leading-7">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.
            </p>
          </div>

          <div className="mb-12 text-[#666]">
            <h1 className="mb-5 text-[25px] font-semibold">
              <span className="block">Natural extracts</span>
              <span className="mask-img mt-4 block h-3 w-[60px] bg-primary-color"></span>
            </h1>
            <p className="text-[15px] leading-7">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.
            </p>
          </div>

          <div className="mb-12 text-[#666]">
            <h1 className="mb-6 text-[25px] font-semibold">
              <span className="block">Quality assurance</span>
              <span className="mask-img mt-4 block h-3 w-[60px] bg-primary-color"></span>
            </h1>
            <p className="text-[15px] leading-7">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenuineCosmetics;
