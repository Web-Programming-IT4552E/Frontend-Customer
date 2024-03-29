import type {
  AxiosDefaults,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios, { AxiosHeaders } from 'axios';
import jwt_decode from 'jwt-decode';

import * as authService from '@/services/authService';

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

export const request = async ({ ...options }: AxiosRequestConfig<AxiosDefaults>, auth: boolean) => {
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
      },
    );

    client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        // take out the origin request
        const originalRequest = error.config;
        const { refreshToken } = authService.getTokenFromLocal();
        const jwtDecodeToken = refreshToken ? jwt_decode(refreshToken) : null;

        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          jwtDecodeToken &&
          !originalRequest._retry
        ) {
          // Unauthorized request
          const res = await authService.getToken();
          const data = res?.data;

          if (data) {
            axios.defaults.headers.common.Authorization = `Bearer ${data?.accessToken}`;
            if (data?.accessToken) {
              authService.setTokenToLocal(data?.accessToken, data?.refreshToken);
            }
            return client(originalRequest);
          }

          authService.forceLogout();
        }
        return Promise.reject(error);
      },
    );
  }

  try {
    const res = await client(options);
    return res;
  } catch (err: any) {
    console.log(err);
    return err?.response;
  }
};
