import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { OrderProduct, OrderItemUpdateQuantity } from "@/@types/order";
import { ReduxDataStatus } from "@/interfaces/redux.interface";

export interface OrderInterface {
	data: Array<OrderProduct>;
	status: ReduxDataStatus;
}

const initialState: OrderInterface = {
	data: [],
	status: ReduxDataStatus.PENDING,
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		addOrderToCart: (state, action: PayloadAction<OrderProduct>) => {
			const dataExisted = state.data?.find(
				(item) => item?.product_id === action.payload.product_id
			);
			dataExisted
				? (dataExisted.quantity += action.payload.quantity)
				: state.data.push(action.payload);
		},
    deleteOrderFromCart: (state, action: PayloadAction<OrderProduct>) => {
      const dataExisted = state.data.find(
				(item) => item?.product_id === action.payload.product_id
			);
      const index = dataExisted ? state.data.indexOf(dataExisted) : -1
      
      index >= 0 ? state.data.splice(index, 1) : state.data
    },
    updateOrderItemQuantity: (state, action: PayloadAction<OrderItemUpdateQuantity>) => {
      const dataExisted = state.data.find(
				(item) => item?.product_id === action.payload.data.product_id
			);
      dataExisted ? dataExisted.quantity = action.payload.quantity : dataExisted
    }
	},
});

export const { addOrderToCart, deleteOrderFromCart, updateOrderItemQuantity } = orderSlice.actions;
export default orderSlice.reducer;
