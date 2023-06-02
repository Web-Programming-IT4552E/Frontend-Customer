import React from 'react';
import Image from 'next/image'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import firstSlider from '@/assets/images/slider-homepage1.jpg'
import secondSlider from '@/assets/images/slider-homepage2.jpg'
import thirdSlider from '@/assets/images/slider-homepage3.jpg'
import BannerItem from './BannerItem';

const Banner = () => {
  const bannerList = [
    { 
      title: "Spray Moisturizing",
      descrition: "GENTLE FOR WINTER",
      imgUrl: firstSlider
    },
    { 
      title: "Skin lightening cream",
      descrition: "GENTLE FOR WINTER",
      imgUrl: secondSlider
    },
    { 
      title: "Skin Anti-aging",
      descrition: "GENTLE FOR WINTER",
      imgUrl: thirdSlider
    },
  ]

  const settings = {
    dots: true,
    // infinite: true,
    arrows: false,
    speed: 500,
    // autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {/* {bannerList.map((bannerItem) => (
          <BannerItem key={bannerItem.title} title={bannerItem.title} description={bannerItem.descrition} imgUrl={bannerItem.imgUrl} />
        ))} */}
        <BannerItem title='Spray Moisturizing' description='GENTLE FOR WINTER' imgUrl={firstSlider} />
      </Slider>
    </div>
  );
};

export default Banner;
