import { useQuery } from '@tanstack/react-query';
import env from '@/configs/env';
import { request } from '@/utils/request';
import { GetAllProductsResponse } from '@/@types/product';

const productApis = {
  async getAllProduct(page: number, limit: number) {
    return request({ url: `${env.api}/product`, params: {
      page,
      limit
    } }, false);
  },
};

export const useGetAllProducts = (page: number, limit: number) => {
  return useQuery<GetAllProductsResponse>(['product/all'], () => productApis.getAllProduct(page, limit));
};
