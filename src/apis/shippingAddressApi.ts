import {
  useQuery,
} from "@tanstack/react-query";
import { request } from "@/utils/request";
import { GetAllShippingAddresses } from "@/@types/shipping-address";
import { ShippingAddressFilter } from '../interfaces/shipping_addresses.interface';

const shippingApis = {
  async getAll(filter: ShippingAddressFilter) {
    const response = await request(
      {
        url: `shipping-address?page=${filter.page}&limit=${filter.limit}`,
      },
      true
    );
    return response.data;
  },
};

export const useGetAllShippingAddresses = (filter: ShippingAddressFilter) => {
  return useQuery<GetAllShippingAddresses>(["/profile/shipping-address", filter], () => shippingApis.getAll(filter));
};
