import React from 'react';

import type { OrderItemType } from '@/@types/order';
import orderItemImg from '@/assets/images/cart-item.jpg';

import OrderItem from './common/OrderItem';

const OrderList = () => {
  const orderList: Array<OrderItemType> = [
    {
      name: 'Striped Stretchie',
      price: 17,
      quantity: 2,
      itemImg: orderItemImg,
    },
    {
      name: 'Striped Stretchie',
      price: 17,
      quantity: 1,
      itemImg: orderItemImg,
    },
  ];

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
          <div className='flex w-[600px] flex-col gap-3 sm:w-full'>
            {orderList.map((orderItem, index) => (
              <OrderItem data={orderItem} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className='py-5'>No products in cart</div>
      )}
    </>
  );
};

export default OrderList;
