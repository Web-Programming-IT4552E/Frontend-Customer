import Image from 'next/image';

import type { IOrderItem, OrderItemUpdateQuantity } from '@/@types/order';
import { useAppDispatch } from '@/configs/redux';
import { deleteOrderFromCart, updateOrderItemQuantity } from '@/reducers/order';

const OrderItem = ({ data }: IOrderItem) => {
  const dispatch = useAppDispatch();
  const itemCount = data.quantity;

  const handleIncreaseItemQuantity = () => {
    const newItemCount = itemCount + 1;
    const updateOrderItem: OrderItemUpdateQuantity = {
      data,
      quantity: newItemCount,
    };
    dispatch(updateOrderItemQuantity(updateOrderItem));
  };

  const handleDecreaseItemQuantity = () => {
    const newItemCount = itemCount - 1;
    if (newItemCount > 0) {
      const updateOrderItem: OrderItemUpdateQuantity = {
        data,
        quantity: newItemCount,
      };
      dispatch(updateOrderItemQuantity(updateOrderItem));
    } else {
      dispatch(deleteOrderFromCart(data));
    }
  };

  return (
    <div className='grid grid-cols-5 items-center border-b-[1px] border-solid border-[#ccc] py-4'>
      <div className='col-span-2 flex items-center gap-3 lg:gap-5'>
        <Image src={data.image} alt='order item' width={100} height={100} />
        <h1 className='mb-0 text-[15px] leading-5'>{data.name}</h1>
      </div>
      <span className='text-[15px]'>{`$ ${data.price}`}</span>
      <span className='flex items-center text-[15px]'>
        <span
          onClick={handleDecreaseItemQuantity}
          className='cursor-pointer border-[1px] border-solid border-black px-2 py-[2px] text-[23px]'
        >
          -
        </span>
        <span className='border-y-[1px] border-solid border-black px-2 py-[6px]'>{itemCount}</span>

        <span
          onClick={handleIncreaseItemQuantity}
          className='cursor-pointer border-[1px] border-solid border-black px-2 py-[2px] text-[23px]'
        >
          +
        </span>
      </span>
      <span className='text-[15px]'>{`$ ${data.price * data.quantity}`}</span>
    </div>
  );
};

export default OrderItem;
