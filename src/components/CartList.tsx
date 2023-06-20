import React from 'react'

import CartItem from './common/CartItem'
import Button from './common/Button'
import { orderItemType } from '@/@types/order'

import itemCart from '@/assets/images/cart-item.jpg'


const CartList = () => {
  const cartList: Array<orderItemType> = [
    {
      name: 'Striped Stretchie',
      price: 17,
      quantity: 1,
      itemImg: itemCart
    },
    {
      name: 'Striped Stretchie',
      price: 17,
      quantity: 1,
      itemImg: itemCart
    },
  ]

  return (
    <>
      {cartList.length > 0 ? (
        <div className='flex flex-col gap-5 px-3 py-4'>
          {cartList.map((cartItem) => (
            <CartItem data={cartItem} />
          ))}

          <div className='flex flex-col gap-7'>
            <div className='flex justify-between items-center pb-[19px] text-[15px] font-semibold border-b-[1px] border-solid border-[#ccc]'>
              <h1 className='mb-0 font-semibold'>Subtotal:</h1>
              <span>$17</span>
            </div>
            <div>
              <Button className='text-[15px]' normal>View Cart</Button>
              <Button className='text-[15px]' normal>Checkout</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='py-5'>No products in cart</div>
      )}
    </>
  )
}

export default CartList