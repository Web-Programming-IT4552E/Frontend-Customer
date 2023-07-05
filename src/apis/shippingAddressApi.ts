import { useQuery } from '@tanstack/react-query';

import type {
  CreateShippingAddressDto,
  GetAllShippingAddressDataFieldItem,
  GetAllShippingAddresses,
  UpdateShippingAddressDto,
} from '@/@types/shipping-address';
import { request } from '@/utils/request';
import { SuccessCode } from '@/utils/status';

import type { ShippingAddressFilter } from '../interfaces/shipping_addresses.interface';

export const shippingApis = {
  async getAll(filter: ShippingAddressFilter) {
    const response = await request(
      {
        url: `shipping-address?page=${filter.page}&limit=${filter.limit}`,
      },
      true
    );
    return response.data;
  },
  async getDetail(shippingId: string) {
    const response = await request(
      {
        url: `shipping-address/${shippingId}`,
      },
      true
    );
    return response.data;
  },
  async addOne(data: CreateShippingAddressDto) {
    const response = await request(
      {
        url: `shipping-address`,
        method: 'POST',
        data: data as any,
      },
      true
    );
    if (!SuccessCode.includes(response.status)) {
      throw new Error(response.data?.message || 'Add shipping address failed');
    }
    return response.data;
  },
  async updateOne(id: string, data: UpdateShippingAddressDto) {
    const response = await request(
      {
        url: `shipping-address/${id}`,
        method: 'PUT',
        data: data as any,
      },
      true
    );
    return response.data;
  },
};

export const useGetAllShippingAddresses = (filter: ShippingAddressFilter) => {
  return useQuery<GetAllShippingAddresses>(['/shipping-address', filter], () =>
    shippingApis.getAll(filter)
  );
};

export const useGetShippingAddressDetail = (
  shippingId: string,
  enabled: boolean = true
) => {
  return useQuery<GetAllShippingAddressDataFieldItem>(
    ['/shipping-address/:id', shippingId],
    () => shippingApis.getDetail(shippingId),
    { enabled }
  );
};
