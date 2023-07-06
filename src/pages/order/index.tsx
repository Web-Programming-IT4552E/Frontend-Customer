import 'react-toastify/dist/ReactToastify.css';

import { Modal } from 'antd';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import type { Voucher } from '@/@types/voucher';
import OrderForm from '@/components/OrderForm';
import OrderList from '@/components/OrderList';
import VoucherItem from '@/components/VoucherItem';
import { useAppSelector } from '@/configs/redux';
import * as authService from '@/services/authService';
import voucherService from '@/services/voucherService';

const OrderDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucher, setVoucher] = useState<Voucher[]>([]);
  const [voucherApply, setVoucherApply] = useState<Voucher>();
  const [discount, setDiscount] = useState(0);
  const subTotal = useAppSelector((state) => {
    let total = 0;
    for (const product of state.order.data) {
      total += product.quantity * product.price;
    }
    return total;
  });

  const isAuth = authService.getIsAuthFromLocal();

  const handleOpenModal = async () => {
    const param = {
      page: 1,
      limit: 10,
    };
    const response = await voucherService.getVoucher({ ...param });
    console.log(response);

    if (response.status === 200) {
      setVoucher(response.data.data);
      setIsModalOpen(true);
    } else {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };

  const handleOkModal = async () => {
    const response =
      voucherApply &&
      (await voucherService.applyVoucher({
        discount_code: voucherApply.code,
        total_product_cost: subTotal,
      }));
    if (response.status === 200) {
      toast.success('Apply voucher successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        pauseOnHover: false,
      });
      setDiscount(response.data);
    } else {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div id='order-detail' className='p-6 sm:px-12 sm:py-10 lg:px-24'>
        <OrderList />
        <div className='mt-12'>
          <h1 className='mb-10 text-center text-[30px] font-bold uppercase tracking-widest sm:text-left'>
            Order detail
          </h1>

          <div className='grid grid-cols-1 gap-12 sm:grid-cols-6 lg:gap-32 '>
            <OrderForm
              subTotal={subTotal}
              discount={discount}
              voucherApply={voucherApply}
              setVoucherApply={setVoucherApply}
            />

            <div className='col-span-2 flex w-full flex-col gap-10'>
              <div>
                <h1 className='mb-5 text-[15px] font-bold uppercase tracking-widest'>
                  Merchandise Subtotal:
                </h1>
                <span>$ {subTotal}</span>
              </div>
              <div>
                <h1 className='mb-5 flex items-center gap-4 text-[15px] font-bold uppercase tracking-widest'>
                  <span>Voucher:</span>
                  <button
                    disabled={!isAuth}
                    onClick={isAuth ? handleOpenModal : () => {}}
                    className={`rounded ${
                      isAuth ? 'bg-primary-color hover:bg-[#e08082]' : 'bg-[#ccc]'
                    } px-3 py-[6px] font-semibold text-white transition-all ease-linear `}
                  >
                    Add
                  </button>
                </h1>
                <span>{voucherApply && discount > 0 ? voucherApply.code : '---'}</span>
              </div>
              <div>
                <h1 className='mb-5 text-[15px] font-bold uppercase tracking-widest'>Discount:</h1>
                <span>$ {discount}</span>
              </div>
              <div>
                <h1 className='mb-5 text-[15px] font-bold uppercase tracking-widest'>
                  Total point:
                </h1>
                <span>0 point</span>
              </div>
              <div>
                <h1 className='mb-5 text-[15px] font-bold uppercase tracking-widest'>
                  Total payment:
                </h1>
                <span>$ {subTotal - discount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAuth && (
        <Modal
          className='voucher-modal'
          title='Vouchers'
          open={isModalOpen}
          okButtonProps={
            voucherApply && voucher.length > 0 ? { disabled: false } : { disabled: true }
          }
          onOk={handleOkModal}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className='mt-4 mb-8 flex h-[300px] flex-col gap-4 overflow-y-auto'>
            {voucher.length > 0 ? (
              voucher.map((voucherItem) => (
                <VoucherItem
                  key={voucherItem._id}
                  voucherApply={voucherApply}
                  voucher={voucherItem}
                  setVoucherApply={setVoucherApply}
                />
              ))
            ) : (
              <div className='text-base'>You don't have any vouchers!</div>
            )}
          </div>
        </Modal>
      )}

      <ToastContainer />
    </>
  );
};

export default OrderDetail;
