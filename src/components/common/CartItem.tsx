import React from 'react'
import Image from 'next/image'
import { HiXMark } from "react-icons/hi2";

import { IOrderItem } from '@/@types/order';

const CartItem = ({data}: IOrderItem) => {
  
  return (
    <div className='flex gap-3 pb-3 border-b-[1px] border-solid border-[#ccc] cursor-pointer hover:opacity-90'>
      <Image src={data.itemImg} alt='item img' width={65} height={65} />
      <div className='flex-1 flex flex-col justify-between py-[6px] text-[15px]'>
        <div className='w-full flex justify-between self-start'>
          <h1 className='text-[#333] font-extralight mb-0'>{data.name}</h1>
          <HiXMark className='cursor-pointer' />
        </div>
        <div className='self-start'>
          {`${data.quantity}  x  $${data.price}`}
        </div>
      </div>
    </div>
  )
}

export default CartItem