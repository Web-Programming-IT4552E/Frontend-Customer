import {
  useQuery,
} from "@tanstack/react-query";
import { request } from "@/utils/request";
import { WardData } from "@/@types/ward";

const wardApis = {
  async getAll(districtId: string) {
    const response = await request(
      {
        url: `area/wards?district=${districtId}`,
      },
      true
    );
    return response.data;
  },
};

export const useGetAllWards = (districtId: string, enabled: boolean = true) => {
  return useQuery<WardData[]>(["/area/wards", districtId], () => wardApis.getAll(districtId), { enabled });
};
