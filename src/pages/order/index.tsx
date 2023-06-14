import React from "react";
import { Form, Input, Select } from "antd";

import OrderList from '@/components/OrderList';

const OrderDetail = () => {
	const { Option } = Select;

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div id="order-detail" className="px-6 py-6 sm:px-20 sm:py-10">
			<OrderList />
			<div className="mt-12">
				<h1 className="text-[30px] font-bold uppercase tracking-widest">
					Order detail
				</h1>

				<div className="grid grid-cols-6 gap-32">
					<Form
						name="basic"
						initialValues={{ remember: false }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						{...{
							labelCol: { span: 8 },
							wrapperCol: { span: 16 },
						}}
						className="col-span-4"
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
					</Form>

					<div className="col-span-2">hi</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
