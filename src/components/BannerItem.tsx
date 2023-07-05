import type { StaticImageData } from 'next/image';
import Link from 'next/link';

import Button from './common/Button';

export interface IBannerItem {
  title: string;
  description: string;
  imgUrl: StaticImageData;
}

const BannerItem = ({ title, description, imgUrl }: IBannerItem) => {
  const firstTitle = title.split(' ', 1)[0];
  const restTitle = title.slice(firstTitle?.length);

  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl.src})`,
      }}
      className='relative bg-cover bg-center bg-no-repeat pt-[151%] sm:pt-[72%] lg:pt-[53%]'
    >
      <div className='absolute inset-y-0 left-0 flex w-[100%] flex-col items-center justify-center text-center sm:left-24 sm:w-[44%] lg:left-32'>
        <h1 className='mb-8 font-secondary-font text-[66px] text-[#333] lg:text-[90px]'>
          {firstTitle} <br /> {restTitle}
        </h1>
        <p className='mb-11 text-[22px] text-[#B8B8B8] lg:text-[25px]'>{description}</p>
        <Link href='/product/all'>
          <Button primary>SHOP NOW</Button>
        </Link>
      </div>
    </div>
  );
};

export default BannerItem;
