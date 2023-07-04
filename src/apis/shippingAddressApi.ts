import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { request } from "@/utils/request";
import { GetAllShippingAddresses } from "@/@types/shipping-address";
import { ShippingAddressFilter } from '../interfaces/shipping_addresses.interface';
import { CreateShippingAddressDto, UpdateShippingAddressDto } from '../@types/shipping-address';
import { SuccessCode } from '@/utils/status';
import { toast } from "react-toastify";
import console from "console";

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
  async addOne(data: CreateShippingAddressDto) {
    const response = await request(
      {
        url: `shipping-address`,
        method: "POST",
        data: data as any,
      },
      true
    );
    if (!SuccessCode.includes(response.status)) {
      throw new Error(response.data?.message || "Add shipping address failed")
    }
    return response.data;
  },
  async updateOne(id: string,data: UpdateShippingAddressDto) {
    const response = await request(
      {
        url: `shipping-address/${id}`,
        method: "PUT",
        data: data as any,
      },
      true
    );
    return response.data;
  }
};

export const useGetAllShippingAddresses = (filter: ShippingAddressFilter) => {
  return useQuery<GetAllShippingAddresses>(["/profile/shipping-address", filter], () => shippingApis.getAll(filter));
};
