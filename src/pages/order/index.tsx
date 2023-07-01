import { Form, Input, Select } from 'antd';
import React from 'react';

import Button from '@/components/common/Button';
import OrderList from '@/components/OrderList';

const OrderDetail = () => {
  const { Option } = Select;

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id="order-detail" className="p-6 sm:px-12 sm:py-10 lg:px-24">
      <OrderList />
      <div className="mt-12">
        <h1 className="mb-10 text-center text-[30px] font-bold uppercase tracking-widest sm:text-left">
          Order detail
        </h1>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-6 lg:gap-32 ">
          <Form
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            labelWrap
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            {...{
              labelCol: { span: 8 },
              wrapperCol: { span: 16 },
            }}
            className="order-last col-span-4 sm:order-first"
          >
            <Form.Item
              label="Fullname"
              name="fullname"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: false }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone" rules={[{ required: false }]}>
              <Input />
            </Form.Item>

            <Form.Item name="city" label="City" rules={[{ required: false }]}>
              <Select placeholder="Select city" onChange={() => {}} allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="district"
              label="District"
              rules={[{ required: false }]}
            >
              <Select
                placeholder="Select district"
                onChange={() => {}}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>

            <Form.Item name="ward" label="Ward" rules={[{ required: false }]}>
              <Select placeholder="Select ward" onChange={() => {}} allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="payment method"
              label="Payment method"
              rules={[{ required: false }]}
            >
              <Select
                placeholder="Select payment method"
                onChange={() => {}}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>

            <Form.Item name="shipping address" label="Shipping address">
              <Input.TextArea />
            </Form.Item>

            <Form.Item className="self-end">
              <Button third type="submit" className="sm:w-[160px] sm:py-[10px]">
                Checkout
              </Button>
            </Form.Item>
          </Form>

          <div className="col-span-2 flex w-full flex-col gap-10">
            <div>
              <h1 className="mb-5 text-[15px] font-bold uppercase tracking-widest">
                Merchandise Subtotal:
              </h1>
              <span>$ 50</span>
            </div>
            <div>
              <h1 className="mb-5 text-[15px] font-bold uppercase tracking-widest">
                Voucher:
              </h1>
              <span>---</span>
            </div>
            <div>
              <h1 className="mb-5 text-[15px] font-bold uppercase tracking-widest">
                Discount:
              </h1>
              <span>$ 0</span>
            </div>
            <div>
              <h1 className="mb-5 text-[15px] font-bold uppercase tracking-widest">
                Total point:
              </h1>
              <span>0 point</span>
            </div>
            <div>
              <h1 className="mb-5 text-[15px] font-bold uppercase tracking-widest">
                Total payment:
              </h1>
              <span>$ 50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
