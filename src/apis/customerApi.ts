import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import type { ChangePassword, Customer } from '@/@types/customer';
import { request } from '@/utils/request';
import { SuccessCode } from '@/utils/status';

export const customerApis = {
  async getProfile() {
    const response = await request(
      {
        url: `account`,
      },
      true
    );
    return response.data;
  },
  async updateProfile(data: Customer) {
    const response = await request(
      {
        url: `account/change/profile`,
        data: data as any,
        method: 'PUT',
      },
      true
    );
    return response.data;
  },
  async changePassword(data: ChangePassword) {
    const response = await request(
      {
        url: `account/change/password`,
        data: data as any,
        method: 'PATCH',
      },
      true
    );
    if (!SuccessCode.includes(response.status)) {
      throw new Error(`${response.data.message}`);
    }
    return response.data;
  },
};

export const useGetProfile = () => {
  return useQuery<Customer>(['/profile'], () => customerApis.getProfile());
};

export const useUpdateProfile = (data: Customer) => {
  const queryClient = useQueryClient();
  return useMutation(() => customerApis.updateProfile(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/profile']);
      toast.success('Update profile successfully!');
    },
    onError: (e) => {
      console.log(e);
      toast.error('Update profile failed!');
    },
  });
};

export const useChangePassword = (data: ChangePassword) => {
  return useMutation<ChangePassword>(() => customerApis.changePassword(data), {
    onSuccess: () => {
      toast.success('Update profile successfully!');
    },
    onError: (e: any) => {
      toast.error(e?.message || 'Update profile failed!');
    },
  });
};
