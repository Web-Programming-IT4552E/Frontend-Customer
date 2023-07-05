export interface ProductFilter {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  sort?: string;
  price?: number[];
}
