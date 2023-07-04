import Link from 'next/link'

import Button from './common/Button';
import CartItem from './common/CartItem';
import { useAppSelector } from '@/configs/redux';

const CartList = () => {
  const cartList = useAppSelector((state) => state.order.data);
  const subTotal = useAppSelector(state => {
    let total = 0;
    for (let product of state.order.data) {
      total += product.quantity * product.price;
    }
    return total;
  })

  return (
    <>
      {cartList.length > 0 ? (
        <div className="flex flex-col gap-5 px-3 py-4">
          <div className='h-[260px] mr-[-20px] flex flex-col gap-4 overflow-y-auto'>
            {cartList.map((cartItem, index) => {
              return <CartItem data={cartItem}  key={index} />
            })}
          </div>

          <div className="flex flex-col gap-7">
            <div className="flex items-center justify-between border-b-[1px] border-solid border-[#ccc] pb-[19px] text-[15px] font-semibold">
              <h1 className="mb-0 font-semibold">Subtotal:</h1>
              <span>${subTotal}</span>
            </div>
            <div>
              <Link href="/order">
                <Button className="text-[15px]" normal>
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='py-5'>No products in cart</div>
      )}
    </>
  );
};

export default CartList;
