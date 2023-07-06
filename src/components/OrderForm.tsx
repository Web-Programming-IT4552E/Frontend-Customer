import { Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@/components/common/Button';
import { useAppSelector } from '@/configs/redux';
import * as authService from '@/services/authService';
import orderService from '@/services/orderService';
import type { OrderForm } from '@/@types/order';
import { useGetAllCountries } from '@/apis/countryApi';
import { useGetAllCities } from '@/apis/cityApi';
import { useState } from 'react';
import { useGetAllDistricts } from '@/apis/districtApi';
import { useGetAllWards } from '@/apis/wardApi';
import { useGetAllShippingAddresses } from '@/apis/shippingAddressApi';

const OrderForm = ({ subTotal, discount, voucherApply, setVoucherApply }: OrderForm) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const isAuth = authService.getIsAuthFromLocal();

  const [cityCode, setCityCode] = useState('');
  const [districtCode, setDistrictCode] = useState('');

  const { data: addresses } = isAuth
    ? useGetAllShippingAddresses({ page: 1, limit: 10 })
    : { data: undefined };
  const { data: countries = [] } = useGetAllCountries();
  const countryCode = countries.at(0)?.code;
  const { data: cities = [] } = countryCode ? useGetAllCities(countryCode) : useGetAllCities('');
  const { data: districts = [] } = useGetAllDistricts(cityCode);
  const { data: wards = [] } = useGetAllWards(districtCode);

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
    setVoucherApply(undefined);
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
        form={form}
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
        {isAuth && (
          <Form.Item name='address' label='Choose your address' rules={[{ required: false }]}>
            <Select
              placeholder='Select address'
              allowClear
              onSelect={(value, option) => {
                const { address_detail } = option.address;
                form.setFieldsValue({
                  fullname: address_detail.receiver_name,
                  phone: address_detail.receiver_phone_number,
                  city: address_detail.city,
                  district: address_detail.district,
                  ward: address_detail.ward,
                  shipping_address: address_detail.address,
                });
              }}
            >
              {addresses &&
                addresses.data.map((address) => (
                  <Option key={address._id} value={address._id} address={address}>
                    {`${address.address_detail.address}, ${address.address_detail.ward}, ${address.address_detail.district}, ${address.address_detail.city}`}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item label='Fullname' name='fullname' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Email' name='email' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Phone' name='phone' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name='city' label='City' rules={[{ required: true }]}>
          <Select
            placeholder='Select city'
            allowClear
            onSelect={(value, option) => {
              setCityCode(option.code);
              isAuth
                ? form.resetFields(['address', 'district', 'ward', 'shipping_address'])
                : form.resetFields(['district', 'ward', 'shipping_address']);
            }}
          >
            {cities &&
              cities.map((city) => (
                <Option key={city._id} value={city.name} code={city.code}>
                  {city.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name='district' label='District' rules={[{ required: true }]}>
          <Select
            placeholder='Select district'
            allowClear
            onSelect={(value, option) => {
              setDistrictCode(option.code);
              isAuth
                ? form.resetFields(['address', 'ward', 'shipping_address'])
                : form.resetFields(['ward', 'shipping_address']);
            }}
          >
            {districts &&
              districts.map((district) => (
                <Option key={district._id} value={district.name} code={district.code}>
                  {district.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name='ward' label='Ward' rules={[{ required: true }]}>
          <Select
            placeholder='Select ward'
            allowClear
            onSelect={() =>
              isAuth
                ? form.resetFields(['address', 'shipping_address'])
                : form.resetFields(['shipping_address'])
            }
          >
            {wards &&
              wards.map((ward) => (
                <Option key={ward._id} value={ward.name} code={ward.code}>
                  {ward.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name='payment_method' label='Payment method' rules={[{ required: true }]}>
          <Select placeholder='Select payment method' onChange={() => {}} allowClear>
            <Option value='cash'>Cash</Option>
            <Option value='credit card'>Credit card</Option>
          </Select>
        </Form.Item>

        <Form.Item name='shipping_address' label='Shipping address' rules={[{ required: true }]}>
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
