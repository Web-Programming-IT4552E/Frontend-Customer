import 'react-toastify/dist/ReactToastify.css';

import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import type { Voucher } from '@/@types/voucher';
import Button from '@/components/common/Button';
import OrderList from '@/components/OrderList';
import VoucherItem from '@/components/VoucherItem';
import { useAppSelector } from '@/configs/redux';
import voucherService from '@/services/voucherService';

const OrderDetail = () => {
  const { Option } = Select;
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

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOkModal = async () => {
    const response =
      voucherApply &&
      (await voucherService.applyVoucher({
        discount_code: voucherApply.code,
        total_product_code: subTotal,
      }));
    console.log(response);
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
            <Form
              name='basic'
              initialValues={{ remember: false }}
              onFinish={onFinish}
              labelWrap
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              {...{
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
              }}
              className='order-last col-span-4 sm:order-first'
            >
              <Form.Item label='Fullname' name='fullname' rules={[{ required: false }]}>
                <Input />
              </Form.Item>

              <Form.Item label='Email' name='email' rules={[{ required: false }]}>
                <Input />
              </Form.Item>

              <Form.Item label='Phone' name='phone' rules={[{ required: false }]}>
                <Input />
              </Form.Item>

              <Form.Item name='city' label='City' rules={[{ required: false }]}>
                <Select placeholder='Select city' onChange={() => {}} allowClear>
                  <Option value='Ha Noi'>Ha Noi</Option>
                  <Option value='Ninh Binh'>Ninh Binh</Option>
                  <Option value='Thanh Hoa'>Thanh Hoa</Option>
                  <Option value='Ha Giang'>Thanh Hoa</Option>
                </Select>
              </Form.Item>

              <Form.Item label='District' name='district' rules={[{ required: false }]}>
                <Input />
              </Form.Item>

              <Form.Item label='Ward' name='ward' rules={[{ required: false }]}>
                <Input />
              </Form.Item>

              <Form.Item name='payment method' label='Payment method' rules={[{ required: false }]}>
                <Select placeholder='Select payment method' onChange={() => {}} allowClear>
                  <Option value='cash'>Cash</Option>
                  <Option value='credit card'>Credit card</Option>
                </Select>
              </Form.Item>

              <Form.Item name='shipping address' label='Shipping address'>
                <Input.TextArea />
              </Form.Item>

              <Form.Item className='self-end'>
                <Button third type='submit' className='sm:w-[160px] sm:py-[10px]'>
                  Checkout
                </Button>
              </Form.Item>
            </Form>

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
                    onClick={handleOpenModal}
                    className='rounded bg-primary-color px-3 py-[6px] font-semibold text-white transition-all ease-linear hover:bg-[#e08082]'
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
                <span>$ 50</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className='voucher-modal'
        title='Vouchers'
        open={isModalOpen}
        okButtonProps={voucherApply ? { disabled: false } : { disabled: true }}
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
            <div>You don't have any vouchers!</div>
          )}
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default OrderDetail;
