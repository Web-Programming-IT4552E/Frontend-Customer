import type { Dispatch, SetStateAction } from 'react';

export interface Voucher {
  _id: string;
  min_order_value: number;
  name: string;
  code: string;
  description: string;
  applied_user: [
    {
      user_id: string;
      remaining: number;
    },
  ];
}

export interface IVoucherItem {
  voucherApply: Voucher | undefined;
  setVoucherApply: Dispatch<SetStateAction<Voucher | undefined>>;
  voucher: Voucher;
}

export interface IRequestVoucher {
  page: number;
  limit: number;
}

export interface IApplyVoucher {
  discount_code: string;
  total_product_code: number;
}
