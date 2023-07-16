import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/dist/client/image';
import React from 'react';
import Slider from 'react-slick';

const ReviewsProduct = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
  };

  const feedBackData = [
    {
      name: 'Pham Minh Dang',
      url: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/269817774_1562498087459838_1045172874965091586_n.jpg?stp=dst-jpg_s320x320&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=9VQIDWbioDcAX8sbUAD&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBVWROB9FvII_Mbfey0aXIOhvHNsueq6PYPK9FEh3RcnQ&oe=64B8604D',
      rating: 5,
      content:
        "I'm so impressed with this makeup store! The range of makeup brands they carry is impressive, and the store is always stocked with the latest beauty trends. The staff is friendly and always ready to offer helpful makeup tips. I've found my holy grail products here, and I can't imagine shopping for makeup anywhere else.",
    },
    {
      name: 'Dang Minh Khoi',
      url: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/279531805_2131544853688085_4007996573417677809_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=rfJViRAKVosAX-HMEAo&_nc_ht=scontent.fhan2-3.fna&oh=00_AfAGg5bj_cqhZMPTrgOMufk2w7THja3TcPupUcBaRyv9ew&oe=64B9661D',
      rating: 5,
      content:
        'Absolutely love this cosmetics store! They have a fantastic selection of high-quality products that cater to various skin types. The staff is incredibly knowledgeable and helped me find the perfect skincare routine. My skin has never looked better since I started using their products. Highly recommend!',
    },
    {
      name: 'Le Dinh Huy',
      url: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/320245420_1219599305295157_6676258372725583815_n.jpg?stp=c0.0.320.320a_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=wQ1Jxh5L8UQAX_uK0GU&_nc_ht=scontent.fhan2-5.fna&oh=00_AfBDgPoVrHZKVbetM1euDUgFiPFej9Sp-oa1ECr8Ae3NrA&oe=64B87178',
      rating: 5,
      content:
        "This beauty store is a hidden gem! Their organic and natural skincare selection is exceptional, and I appreciate the store's commitment to sustainability. The staff is passionate about clean beauty and provided personalized recommendations based on my skin concerns. The shopping experience was delightful, and I left with a bag full of amazing eco-friendly beauty products.",
    },
  ];

  return (
    <div id='reviews-product'>
      <Slider {...sliderSettings}>
        {feedBackData.map((item, idx) => {
          return (
            <div
              key={idx}
              className='cover justify-content flex items-end bg-reviews_product bg-cover bg-no-repeat px-[66px] pt-[60px] lg:pt-[150px]'
            >
              <div className='inner container w-full px-[15px]'>
                <div className='reviews mt-[80px] bg-white px-[15px] pt-[35px]'>
                  <div className='avatar-author'>
                    <Image
                      className=' rounded-[100%]'
                      src={item.url}
                      alt='product-item'
                      loading='lazy'
                      width={380}
                      height={380}
                    ></Image>
                  </div>
                  <div className='entry-content'>
                    <h2 className='author-name'>{item.name}</h2>
                    <div className='item-rating'>
                      <div className='star-rating'>
                        {new Array(item.rating).fill(0).map((_, i) => (
                          <FontAwesomeIcon icon={faStar} key={i} className='text-light_pink' />
                        ))}
                      </div>
                    </div>
                    <p className='description'>{item.content}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ReviewsProduct;
