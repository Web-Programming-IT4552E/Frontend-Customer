import { Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@/components/common/Button';
import { useAppSelector } from '@/configs/redux';
import * as authService from '@/services/authService';
import orderService from '@/services/orderService';
import type { OrderForm } from '@/@types/order';

const OrderForm = ({subTotal, discount, voucherApply, setVoucherApply}: OrderForm) => {
  const { Option } = Select;
  const isAuth = authService.getIsAuthFromLocal();

  const orderProductList = useAppSelector((state) =>
    state.order.data.map((orderProductItem) => ({
      product_id: orderProductItem.product_id,
      quantity: orderProductItem.quantity,
    })),
  );

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const orderData = {
      products: orderProductList,
      payment_method: values.payment_method,
      shipping_address: {
        receiver_name: values.fullname,
        receiver_phone_number: values.phone,
        city: values.city,
        district: values.district,
        ward: values.ward,
        address: values.shipping_address,
      },
    };

    let orderDetail;
    if (isAuth) {
      orderDetail = {
        ...orderData,
        total_product_cost: subTotal - discount,
        discount_code: voucherApply?.code,
      } as any;
    } else {
      orderDetail = { ...orderData, customer_email: values.email } as any;
    }
    const response = isAuth
      ? await orderService.loyalOrder({ ...orderDetail })
      : await orderService.publicOrder({ ...orderDetail });
    console.log(response);

    if (response.status === 201) {
      toast.success('Created order successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        pauseOnHover: false,
      });
    } else {
      toast.error('Create order failed!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
    setVoucherApply(undefined)
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.error(errorInfo, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  return (
    <>
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
  
        <Form.Item name='payment_method' label='Payment method' rules={[{ required: false }]}>
          <Select placeholder='Select payment method' onChange={() => {}} allowClear>
            <Option value='cash'>Cash</Option>
            <Option value='credit card'>Credit card</Option>
          </Select>
        </Form.Item>
  
        <Form.Item name='shipping_address' label='Shipping address'>
          <Input.TextArea />
        </Form.Item>
  
        <Form.Item className='self-end'>
          <Button third type='submit' className='sm:w-[160px] sm:py-[10px]'>
            Checkout
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OrderForm;
