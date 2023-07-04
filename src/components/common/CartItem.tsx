import Image from 'next/image';
import React from 'react';
import { HiXMark } from 'react-icons/hi2';

import type { IOrderItem } from '@/@types/order';
import { useAppDispatch } from '@/configs/redux';
import { deleteOrderFromCart } from '@/reducers/order';

const CartItem = ({ data }: IOrderItem) => {
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteOrderFromCart(data));
  }

  return (
    <div className="flex cursor-pointer gap-3 border-b-[1px] border-solid border-[#ccc] pb-3 hover:opacity-90">
      <Image src={data.image} alt="item img" width={65} height={65} />
      <div className="flex flex-1 flex-col justify-between py-[6px] text-[15px]">
        <div className="flex w-full justify-between self-start">
          <h1 className="mb-0 font-extralight text-[#333]">{data.name}</h1>
          <HiXMark className="cursor-pointer text-xl" onClick={handleDeleteItem} />
        </div>
        <div className="self-start">
          {`${data.quantity}  x  $${data.price}`}
        </div>
        <div className='self-start'>{`${data.quantity}  x  $${data.price}`}</div>
      </div>
    </div>
  );
};

export default CartItem;
