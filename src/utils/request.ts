import type {
	AxiosDefaults,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import axios, { AxiosHeaders } from "axios";

import * as authService from "@/services/authService";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 *
 * @param {options} : { url, method, params }
 * @param {isAuth} : check whether should use token or not
 * @returns
 */

export const request = async (
	{ ...options }: AxiosRequestConfig<AxiosDefaults>,
	auth: boolean
) => {
  if (auth) {
    client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        // Handle logic access token here, to request to server here
        const { accessToken } = authService.getTokenFromLocal();
        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        });
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        // take out the origin request
        const originalRequest = error.config;
        if (error.response?.status === 401) {
          // Unauthorized request
          const data = await authService.getToken();
          if (data) {
            axios.defaults.headers.common.Authorization = `Bearer ${data?.accessToken}`;
            if (data?.accessToken) {
              authService.setTokenToLocal(
                data?.accessToken,
                data?.refreshToken
              );
            }
            return client(originalRequest);
          }
          authService.logout();
        }
        return Promise.reject(error);
      }
    );
  }


	try {
		const res = await client(options);
		return res;
	} catch (err: any) {
    console.log(err)
		return err?.response;
	}
};