import type { Dispatch, SetStateAction } from 'react';

import type { ShippingAddressData } from './shipping-address';
import type { Voucher } from './voucher';

export interface OrderProduct {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface IOrderItem {
  data: OrderProduct;
}

export type OrderItemUpdateQuantity = {
  data: OrderProduct;
  quantity: number;
};

export enum OrderStatus {
  NEW = 0,
  CONFIRMED = 1,
  DONE = 2,
  CANCELLED = 3,
}

export interface OrderData {
  _id: string;
  user_id: string;
  products: [OrderProduct];
  customer_email: string;
  shipping_address: ShippingAddressData;
  payment_method: string;
  total_product_cost: number;
  discount: number;
  shipping_unit: string;
  shipping_cost: number;
  shipping_code: string;
  status: OrderStatus;
  created_time: string;
  updated_at: string;
}

export interface ProductOrder {
  product_id: string;
  quantity: number;
}

export interface IOrderForm {
  subTotal: number;
  discount: number;
  voucherApply: Voucher | undefined;
  setVoucherApply: Dispatch<SetStateAction<Voucher | undefined>>;
}

export interface CreateOrderData {
  customer_email: string;
  products: Array<ProductOrder>; // _id of product
  payment_method: string;
  shipping_address: ShippingAddressData;
}

export interface CreateLoyalOrderData {
  products: Array<ProductOrder>; // _id of product
  total_product_cost: number;
  payment_method: string;
  shipping_address: ShippingAddressData;
  discount_code: string;
}
