import type { AxiosDefaults, AxiosRequestConfig } from 'axios';

import type { CreateLoyalOrderData, CreateOrderData } from '@/@types/order';
import * as httpRequest from '@/utils/request';

const publicOrder = async ({
  customer_email,
  products,
  payment_method,
  shipping_address,
}: CreateOrderData) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    method: 'post',
    url: 'order/public',
    data: {
      customer_email,
      products,
      payment_method,
      shipping_address,
    } as any,
  };

  const response = await httpRequest.request(options, false);
  return response;
};

const loyalOrder = async ({
  products,
  total_product_cost,
  payment_method,
  shipping_address,
  discount_code,
}: CreateLoyalOrderData) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    method: 'post',
    url: 'order/loyal',
    data: {
      products,
      total_product_cost,
      payment_method,
      shipping_address,
      discount_code,
    } as any,
  };

  const response = await httpRequest.request(options, true);
  return response;
};

const orderService = { publicOrder, loyalOrder };
export default orderService;
