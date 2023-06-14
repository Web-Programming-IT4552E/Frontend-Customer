import React from "react";

import { orderItemType } from "@/@types/order";

import orderItemImg from "@/assets/images/cart-item.jpg";
import OrderItem from "./common/OrderItem";

const OrderList = () => {
	const orderList: Array<orderItemType> = [
		{
			name: "Striped Stretchie",
			price: 17,
			quantity: 2,
			itemImg: orderItemImg,
		},
		{
			name: "Striped Stretchie",
			price: 17,
			quantity: 1,
			itemImg: orderItemImg,
		},
	];

	return (
		<>
			{orderList.length > 0 ? (
				<div className="flex flex-col gap-5 py-4 overflow-x-scroll sm:overflow-hidden">
					<div className="grid grid-cols-5 text-[18px] uppercase w-[600px] sm:w-full">
						<h1 className="col-span-2 font-bold mb-0 tracking-wider">Product</h1>
						<h1 className="font-bold mb-0 tracking-wider">Price</h1>
						<h1 className="font-bold mb-0 tracking-wider">Quantity</h1>
						<h1 className="font-bold mb-0 tracking-wider">Subtotal</h1>
					</div>
					<div className="flex flex-col gap-3 w-[600px] sm:w-full">
						{orderList.map((orderItem) => (
							<OrderItem data={orderItem} />
						))}
					</div>
				</div>
			) : (
				<div className="py-5">No products in cart</div>
			)}
		</>
	);
};

export default OrderList;
