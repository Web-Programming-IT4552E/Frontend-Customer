import type { AxiosDefaults, AxiosRequestConfig } from 'axios';

import type { IApplyVoucher, IRequestVoucher } from '@/@types/voucher';
import * as authServive from '@/services/authService';
import * as httpRequest from '@/utils/request';

const getVoucher = async ({ page, limit }: IRequestVoucher) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    method: 'get',
    url: 'discount-code',
    params: { page, limit },
  };

  const isAuth = authServive.getIsAuthFromLocal();
  const response = await httpRequest.request(options, isAuth);
  return response;
};

const applyVoucher = async ({ discount_code, total_product_cost }: IApplyVoucher) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    method: 'get',
    url: `discount-code/tryApplying/${discount_code}`,
    params: { total_product_cost },
  };

  const isAuth = authServive.getIsAuthFromLocal();
  const response = await httpRequest.request(options, isAuth);
  return response;
};

const voucherService = { getVoucher, applyVoucher };

export default voucherService;
