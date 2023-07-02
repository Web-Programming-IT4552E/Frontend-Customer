import {
  useQuery,
} from "@tanstack/react-query";
import { request } from "@/utils/request";
import { GetAllShippingAddresses } from "@/@types/shipping-address";

const shippingApis = {
  async getAll(page: number, limit: number) {
    const response = await request(
      {
        url: `shipping-address?page=${page}&limit=${limit}`,
      },
      true
    );
    return response.data;
  },
};

export const useGetAllShippingAddresses = (page: number, limit: number) => {
  return useQuery<GetAllShippingAddresses>(["/shipping-address", page, limit], () => shippingApis.getAll(page, limit));
};
