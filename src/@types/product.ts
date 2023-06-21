import { CategoryData } from "./category";
import { PaginationInfo } from "./pagination";

export enum ProductStatus {
  IN_STOCK,
  TEMPORARILY_OUT_OF_STOCK,
  NO_LONGER_AVAILABLE,
}

export interface ProductItemData {
  _id: string;
  height: number;
  image: string;
  mass: number;
  name: string;
  price: number;
  scent_category: string;
  status: ProductStatus;
  stock: number;
  width: number;
  category: [CategoryData];
}


export interface GetAllProductsResponse {
  data: [ProductItemData];
  paginationInfo: PaginationInfo
}
