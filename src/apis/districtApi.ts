import { useQuery } from "@tanstack/react-query";
import { request } from "@/utils/request";
import { DistrictData } from "@/@types/district";

const districtApis = {
  async getAll(cityId: string) {
    const response = await request(
      {
        url: `area/districts?city=${cityId}`,
      },
      true
    );
    return response.data;
  },
};

export const useGetAllDistricts = (cityId: string, enabled: boolean = true) => {
  return useQuery<DistrictData[]>(
    ["/area/districts", cityId],
    () => districtApis.getAll(cityId),
    { enabled }
  );
};
