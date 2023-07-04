import {
  useQuery,
} from "@tanstack/react-query";
import { request } from "@/utils/request";
import { CountryData } from "@/@types/country";

const countryApis = {
  async getAll() {
    const response = await request(
      {
        url: `area/countries`,
      },
      true
    );
    return response.data;
  },
};

export const useGetAllCountries = (enabled: boolean = true) => {
  return useQuery<CountryData[]>(["/area/countries"], () => countryApis.getAll(), { enabled});
};
