import React from "react";
import { Button, Form, Input } from "antd";

import OrderList from "@/components/OrderList";

const OrderDetail = () => {
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
					Order deatail
				</h1>

				<div className="grid grid-cols-6 gap-32">
					<Form
						name="basic"
						initialValues={{ remember: false }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
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
					</Form>

          <div className="col-span-2">
            hi
          </div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
