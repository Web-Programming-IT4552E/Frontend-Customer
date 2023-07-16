import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useGetAllProducts, useGetDetailProduct } from '@/apis/productApi';
import BreadCumb from '@/components/common/BreadCumb';
import ProductItem from '@/components/common/ProductItem';

const DetailProduct = () => {
  const router = useRouter();
  const productId = router.query.id as string;
  const { data: productData } = useGetDetailProduct(productId, productId !== undefined);
  const { data: relatedProductsData } = useGetAllProducts(
    {
      page: 1,
      limit: 4,
      category: `${
        productData?.category && productData?.category.map((item) => item._id).join(',')
      }`,
    },
    productData !== undefined,
  );
  // const [, setImageUrl] = useState(
  //   'https://uray.physcode.com/wp-content/uploads/2019/02/product8-1024x1024.jpg',
  // );
  const [quantity, setQuantity] = useState(0);

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  // };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div id='detail-product'>
      <BreadCumb navigations={['Home', 'Product', `${productData?.name}`]} />
      <div className='content-area container'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='product-images'>
            <Image src={`${productData?.image || '/'}`} width={800} height={800} alt='main-image' />
            {/* <Slider {...settings}>
              {[
                'https://uray.physcode.com/wp-content/uploads/2019/02/product1-1024x1024.jpg',
                'https://uray.physcode.com/wp-content/uploads/2019/02/product11-1024x1024.jpg',
                'https://uray.physcode.com/wp-content/uploads/2019/02/product7-1024x1024.jpg',
                'https://uray.physcode.com/wp-content/uploads/2019/02/product11-1024x1024.jpg',
                'https://uray.physcode.com/wp-content/uploads/2019/02/product8-1024x1024.jpg',
                'https://uray.physcode.com/wp-content/uploads/2019/02/product8-1024x1024.jpg',
              ].map((item, idx) => {
                return (
                  <div className='' key={idx}>
                    <Image
                      src={item}
                      width={100}
                      height={100}
                      key={item}
                      data-url={item}
                      alt='main-image'
                      onClick={(e: any) => {
                        setImageUrl(e.target.dataset.url as string);
                      }}
                    />
                  </div>
                );
              })}
            </Slider> */}
          </div>
          <div className='product-content  mt-[60px] md:mt-0 md:pl-[45px]'>
            <div className='wrap-title-price mb-[25px]'>
              <h2 className='text-[30px] font-semibold text-[#333]'>
                {`${productData?.name}`}{' '}
                <span className='text-[#666]'>| ${`${productData?.price}`}</span>
              </h2>
            </div>
            <div className='product-info'>
              <div className='star-rating mb-[25px]'>
                {[1, 2, 3, 4, 5].map((item) => (
                  <FontAwesomeIcon icon={faStar} key={item} className='text-light_pink' />
                ))}
              </div>
              <p className='mb-[25px] whitespace-pre-line leading-[26px] text-[#666]'>
                {`${productData?.description}`}
              </p>
              <div className='flex flex-col gap-[10px] text-[15px]'>
                <p className='mb-0 text-medium_gray'>
                  <span className='font-semibold text-dark'>Categories:</span>{' '}
                  {`${
                    productData?.category !== undefined &&
                    productData.category.map((item) => item.name).join(', ')
                  }`}
                </p>
                <p className='mb-0 text-medium_gray'>
                  <span className='font-semibold text-dark'>Slug:</span>{' '}
                  {`${
                    productData?.category !== undefined &&
                    productData.category.map((item) => item.slug).join(', ')
                  }`}
                </p>
              </div>
              <div className='actions mt-[37px] mb-[43px]  flex gap-[20px]'>
                <div className='quantity-action flex items-center'>
                  <Button
                    className='h-[40px] w-[40px] rounded-none border-[#666] text-center'
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>
                  <Input
                    className='h-[40px] w-[40px] rounded-none border-y-[#666] bg-white text-center text-black'
                    defaultValue={0}
                    value={quantity}
                    disabled={true}
                  />
                  <Button
                    className='h-[40px] w-[40px] rounded-none border-[#666] text-center'
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>
                <div className='add-to-cart'>
                  <Button id='add-to-cart-btn'>ADD TO CART</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='relate-products'>
        <h2 className='special-heading'>Related Products</h2>
        <div className='container'>
          <div className='grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {relatedProductsData?.data !== undefined
              ? relatedProductsData.data.map((item, key) => {
                  return <ProductItem key={key} product={item} />;
                })
              : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
