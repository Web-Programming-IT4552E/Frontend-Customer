import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { request } from "@/utils/request";
import { Customer } from "@/@types/customer";

const customerApis = {
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
        method: "PUT"
      },
      true
    );
    return response.data;
  },
};

export const useGetProfile = () => {
  return useQuery<Customer>(["/profile"], () => customerApis.getProfile());
};

export const useUpdateProfile = (data: Customer) => {
  const queryClient = useQueryClient();
  return useMutation<Customer>(() => customerApis.updateProfile(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["/profile"]);
    },
  });
};
