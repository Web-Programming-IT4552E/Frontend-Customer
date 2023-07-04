import React from 'react';

import { useAppSelector } from '@/configs/redux';

import OrderItem from './common/OrderItem';

const OrderList = () => {
  const orderList = useAppSelector((state) => state.order.data);

  return (
    <>
      {orderList.length > 0 ? (
        <div className='flex flex-col gap-5 overflow-x-scroll py-4 sm:overflow-hidden'>
          <div className='grid w-[600px] grid-cols-5 text-[18px] uppercase sm:w-full'>
            <h1 className='col-span-2 mb-0 font-bold tracking-wider'>Product</h1>
            <h1 className='mb-0 font-bold tracking-wider'>Price</h1>
            <h1 className='mb-0 font-bold tracking-wider'>Quantity</h1>
            <h1 className='mb-0 font-bold tracking-wider'>Subtotal</h1>
          </div>
          <div className="flex w-[600px] h-[400px] overflow-y-auto flex-col gap-3 sm:w-full">
            {orderList.map((orderItem, index) => (
              <OrderItem data={orderItem} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-5 text-[24px] font-semibold">No products in cart</div>
      )}
    </>
  );
};

export default OrderList;
