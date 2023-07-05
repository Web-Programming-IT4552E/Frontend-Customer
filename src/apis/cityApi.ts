import { useQuery } from '@tanstack/react-query';

import type { CityData } from '@/@types/city';
import { request } from '@/utils/request';

const cityApis = {
  async getAll(countryId: string) {
    const response = await request(
      {
        url: `area/cities?country=${countryId}`,
      },
      true,
    );
    return response.data;
  },
};

export const useGetAllCities = (countryId: string, enabled: boolean = true) => {
  return useQuery<CityData[]>(['/area/cities', countryId], () => cityApis.getAll(countryId), {
    enabled,
  });
};
