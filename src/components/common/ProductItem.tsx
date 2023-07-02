import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

import { ProductItemData } from '@/@types/product';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductItem: React.FC<{ product: ProductItemData }> = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className="group flex flex-col items-center justify-center overflow-hidden"
      id="common_product_item"
    >
      <div className="relative flex cursor-pointer items-end justify-center overflow-hidden w-full h-full">
        <Image
          src={`${product.image}`}
          alt="product-item"
          loading="lazy"
          width={500}
          height={500}
          className="h-full w-full object-cover max-w-[300px] max-h-[300px]"
          onClick={() => { router.push(`/${"profuct"}/${product._id}`) }}
        />
        <div className="translate-x-[-100%] transition-all duration-200 ease-in-out group-hover:translate-x-[0%]"></div>
        <div className="box-hover translate-y-[100%] transition-all duration-200 ease-linear group-hover:translate-y-[-75%]">
          <a className="link-item cursor-pointer">
            <FontAwesomeIcon
              icon={faCartPlus}
              style={{ fontSize: 16, color: 'black' }}
            />
          </a>
          <Link className="link-item cursor-pointer" href={`/${"product"}/${product._id}`}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{ fontSize: 16, color: 'black' }}
            />
          </Link>
        </div>
      </div>

      <div id="wrapper_content_item" className="my-[30px] w-[100%] text-center">
        <div id="cat_product" className="text-[15px] text-[#999]">
          {product.category.map((item, idx) => {
            return (
              <>
                <Link rel="tag" href={`/product/all?category=${item.name}`}>{item.name}</Link>
                {idx + 1 < product.category.length ? ', ' : ''}
              </>);
          })}

        </div>
        <h2
          id="product_item_title"
          className="my-[20px] mx-[5px] text-[20px] font-semibold"
        >
          {product.name}
        </h2>
        <p
          id="product_item_price"
          className="text-[25px] font-bold text-light_pink"
        >
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
