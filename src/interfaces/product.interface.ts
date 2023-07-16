export interface ProductFilter {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  sort?: string;
  price_start?: number;
  price_end?: number;
}
