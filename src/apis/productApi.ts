import { useQuery } from '@tanstack/react-query';

import type { GetAllProductsResponse, ProductItemData } from '@/@types/product';
import type { ProductFilter } from '@/interfaces/product.interface';
import { request } from '@/utils/request';

const productApis = {
  async getAllProduct(filter: ProductFilter) {
    const response = await request(
      {
        url: `product`,
        params: filter,
      },
      false,
    );
    return response.data;
  },
  async getDetailProduct(productId: string) {
    const response = await request(
      {
        url: `product/${productId}`,
      },
      false,
    );
    return response.data;
  },
};

export const useGetAllProducts = (filter: ProductFilter, enabled: boolean = true) => {
  return useQuery<GetAllProductsResponse>(
    ['product/all', filter],
    () => productApis.getAllProduct(filter),
    { enabled },
  );
};

export const useGetDetailProduct = (productId: string, enabled: boolean = true) => {
  return useQuery<ProductItemData>(
    ['product/', productId],
    () => productApis.getDetailProduct(productId),
    {
      enabled,
    },
  );
};
