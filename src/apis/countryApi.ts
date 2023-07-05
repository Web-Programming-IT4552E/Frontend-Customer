import { useQuery } from '@tanstack/react-query';

import type { CountryData } from '@/@types/country';
import { request } from '@/utils/request';

const countryApis = {
  async getAll() {
    const response = await request(
      {
        url: `area/countries`,
      },
      true,
    );
    return response.data;
  },
};

export const useGetAllCountries = (enabled: boolean = true) => {
  return useQuery<CountryData[]>(['/area/countries'], () => countryApis.getAll(), { enabled });
};
