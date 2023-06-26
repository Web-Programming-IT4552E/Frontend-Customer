import React from "react";
import { Form, Input, Select } from "antd";

import OrderList from "@/components/OrderList";
import Button from "@/components/common/Button";

const OrderDetail = () => {
	const { Option } = Select;

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div id="order-detail" className="px-6 py-6 sm:px-12 sm:py-10 lg:px-24">
			<OrderList />
			<div className="mt-12">
				<h1 className="text-center text-[30px] font-bold uppercase tracking-widest mb-10 sm:text-left">
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
						className="col-span-4 order-last sm:order-first"
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
              <Button third type="submit" className="sm:py-[10px] sm:w-[160px]">
                Checkout
              </Button>
            </Form.Item>
					</Form>

					<div className="col-span-2 flex flex-col gap-10 w-full">
            <div>
              <h1 className="font-bold uppercase text-[15px] tracking-widest mb-5">Merchandise Subtotal:</h1>
              <span>$ 50</span>
            </div>
            <div>
              <h1 className="font-bold uppercase text-[15px] tracking-widest mb-5">Voucher:</h1>
              <span>---</span>
            </div>
            <div>
              <h1 className="font-bold uppercase text-[15px] tracking-widest mb-5">Discount:</h1>
              <span>$ 0</span>
            </div>
            <div>
              <h1 className="font-bold uppercase text-[15px] tracking-widest mb-5">Total point:</h1>
              <span>0 point</span>
            </div>
            <div>
              <h1 className="font-bold uppercase text-[15px] tracking-widest mb-5">Total payment:</h1>
              <span>$ 50</span>
            </div>
          </div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
