import { PaginationInfo } from "./pagination";

export interface ShippingAddressData {
  receiver_name: string;
  receiver_phone_number: string;
  city: string;
  district: string;
  ward: string;
  address: string;
}

export interface CreateShippingAddressDto {
  address_detail: ShippingAddressData;
}

export interface UpdateShippingAddressDto {
  address_detail: ShippingAddressData;
}

export interface GetAllShippingAddressDataFieldItem {
  user_id: string,
  address_detail: ShippingAddressData,
}


export interface GetAllShippingAddresses {
  data: GetAllShippingAddressDataFieldItem[],
  paginationInfo: PaginationInfo,
}