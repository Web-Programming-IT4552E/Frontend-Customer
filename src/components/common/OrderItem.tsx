import Image from 'next/image';
import React, { useState } from 'react';

import type { IOrderItem } from '@/@types/order';

const OrderItem = ({ data }: IOrderItem) => {
  const [itemCount, setItemCount] = useState(data.quantity);

  return (
    <div className="grid grid-cols-5 items-center border-b-[1px] border-solid border-[#ccc] py-4">
      <div className="col-span-2 flex items-center gap-3 lg:gap-5">
        <Image src={data.itemImg} alt="order item" width={100} height={100} />
        <h1 className="mb-0 text-[15px] leading-5">{data.name}</h1>
      </div>
      <span className="text-[15px]">{`$ ${data.price}`}</span>
      <span className="flex items-center text-[15px]">
        <span
          onClick={() => setItemCount(itemCount + 1)}
          className="cursor-pointer border-[1px] border-solid border-black px-2 py-[2px] text-[22px]"
        >
          +
        </span>
        <span className="border-y-[1px] border-solid border-black px-2 py-[6px]">
          {itemCount}
        </span>
        <span
          onClick={() => setItemCount(itemCount - 1)}
          className="cursor-pointer border-[1px] border-solid border-black px-2 py-[2px] text-[22px]"
        >
          -
        </span>
      </span>
      <span className="text-[15px]">{`$ ${data.price * data.quantity}`}</span>
    </div>
  );
};

export default OrderItem;
