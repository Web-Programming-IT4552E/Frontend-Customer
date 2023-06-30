import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

import SampleProductImg from '@/assets/images/sample_product.jpg';

const ProductItem = () => {
  return (
    <div
      className="group flex flex-col items-center justify-center overflow-hidden"
      id="common_product_item"
    >
      <div className="relative flex cursor-pointer items-end justify-center overflow-hidden">
        <Image
          src={SampleProductImg}
          alt="product-item"
          loading="lazy"
          width={500}
          height={500}
        />
        <div className="translate-x-[-100%] transition-all duration-200 ease-in-out group-hover:translate-x-[0%]"></div>
        <div className="box-hover translate-y-[100%] transition-all duration-200 ease-linear group-hover:translate-y-[-75%]">
          <a className="link-item cursor-pointer">
            <FontAwesomeIcon
              icon={faCartPlus}
              style={{ fontSize: 16, color: 'black' }}
            />
          </a>
          <a className="link-item cursor-pointer">
            <FontAwesomeIcon
              icon={faSearch}
              style={{ fontSize: 16, color: 'black' }}
            />
          </a>
        </div>
      </div>

      <div id="wrapper_content_item" className="my-[30px] w-[100%] text-center">
        <div id="cat_product" className="text-[15px] text-[#999]">
          <a rel="tag">Make Up</a>
          {', '}
          <a rel="tag">Skin Care</a>
        </div>
        <h2
          id="product_item_title"
          className="my-[20px] mx-[5px] text-[20px] font-semibold"
        >
          Active Fleece Pants
        </h2>
        <p
          id="product_item_price"
          className="text-[25px] font-bold text-light_pink"
        >
          $10
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
