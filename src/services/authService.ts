import type {
  AxiosDefaults,
  AxiosRequestConfig,
} from 'axios';
import Router from "next/router";

import * as httpRequest from "@/utils/request";
import { LoginRequest, RefreshTokenRequest } from "@/@types/auth";

export const login = async ({ email, password }: LoginRequest) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'auth/login',
    method: 'post',
    data: {
      email, password
    } as any
  }

  const response = await httpRequest.request(options, false);
  return response
};

export const logout = async () => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'auth/logout',
    method: 'post',
  }

  const response = await httpRequest.request(options, true);
  if(response.status === 200) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthToLocal(false);
    Router.push('/auth/login');
  } else {
    console.log(response.data.message);
  }
  return response;
}

export const getToken = async () => {
  const token: RefreshTokenRequest | any = getTokenFromLocal();
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'auth/refresh-token',
    method: 'post',
    data: token
  }

  const response = await httpRequest.request(options, false);
  console.log(response);
  if(response.status) {   // has status mean has error code 400
    return null;
  } else {
    return response
  }
};

export const setTokenToLocal = (accessToken: string, refreshToken: string) => {
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("refreshToken", refreshToken);
};

export const getTokenFromLocal = () => {
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	const token = { accessToken, refreshToken };

	return token;
};

export const setIsAuthToLocal = (isAuth: boolean) => {
  localStorage.setItem('isAuth', isAuth.toString());
}

export const getIsAuthFromLocal = () => {
  const isAuth = localStorage.getItem('isAuth');
  if(isAuth === "true") {
    return true;
  } else {
    return false;
  }
}