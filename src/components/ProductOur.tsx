import React from 'react';

import { useGetAllProducts } from '@/apis/productApi';

import ProductItem from './common/ProductItem';

const ProductOur = () => {
  const { data: response } = useGetAllProducts({
    page: 1,
    limit: 12,
  });

  return (
    <div id='product-our' className='container py-[60px] px-[0px]'>
      <h2 className='special-heading'>Product Our</h2>
      <div className='grid gap-[15px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {response?.data !== undefined &&
          response.data.map((item, idx) => {
            return <ProductItem key={idx} product={item} />;
          })}
      </div>
    </div>
  );
};

export default ProductOur;
