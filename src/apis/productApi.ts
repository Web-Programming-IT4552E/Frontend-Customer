import { useQuery } from '@tanstack/react-query';

import type { GetAllProductsResponse } from '@/@types/product';
import env from '@/configs/env';
import { request } from '@/utils/request';
import { ProductFilter } from '@/interfaces/product.interface';

const productApis = {
  async getAllProduct(filter: ProductFilter) {
    const response = await request(
      {
        url: `${env.api}/product`,
        params: filter
      },
      false
    );
    return response.data;
  },
};

export const useGetAllProducts = (filter: ProductFilter) => {
  return useQuery<GetAllProductsResponse>(['product/all', filter], () =>
    productApis.getAllProduct(filter)
  );
};
