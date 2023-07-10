import type { AxiosDefaults, AxiosRequestConfig } from 'axios';
import Router from 'next/router';

import type { LoginRequest, RefreshTokenRequest, ResetPasswordRequest } from '@/@types/auth';
import type { RegisterUserRequest } from '@/@types/user';
import * as httpRequest from '@/utils/request';
import { SuccessCode } from '@/utils/status';

export const setTokenToLocal = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getTokenFromLocal = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const token = { accessToken, refreshToken };

  return token;
};

export const setIsAuthToLocal = (isAuth: boolean) => {
  localStorage.setItem('isAuth', isAuth.toString());
};

export const getIsAuthFromLocal = () => {
  const isAuth = localStorage.getItem('isAuth');
  if (isAuth === 'true') {
    return true;
  }
  return false;
};

export const login = async ({ email, password }: LoginRequest) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'auth/login',
    method: 'post',
    data: {
      email,
      password,
    } as any,
  };

  const response = await httpRequest.request(options, false);
  return response;
};

export const logout = async () => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'auth/logout',
    method: 'post',
  };

  const response = await httpRequest.request(options, true);
  if (SuccessCode.includes(response.status)) {
    removeTokens();
    Router.push('/auth/login');
  }
  else {
    forceLogout();
  }
  return response;
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  setIsAuthToLocal(false);
}

export const forceLogout = () => {
  removeTokens();
  window.location.href = "/auth/login"
}

export const register = async ({ email, password, phone, fullname }: RegisterUserRequest) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'account',
    method: 'post',
    data: { email, password, phone, fullname } as any,
  };

  const response = await httpRequest.request(options, false);
  console.log(response);
  return response;
};

export const verifyRegister = async (activeToken: string) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: `account/register/verify/${activeToken}`,
    method: 'get',
  };

  const response = await httpRequest.request(options, false);
  return response;
};

export const forgotPassword = async (email: string) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'account/forgot-password',
    method: 'post',
    data: { email } as any,
  };

  const response = await httpRequest.request(options, false);
  return response;
};

export const verifyForgotPassword = async (activeToken: string) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: `account/forgot-password/verify/${activeToken}`,
    method: 'get',
  };

  const response = await httpRequest.request(options, false);
  return response;
};

export const updatePassword = async ({
  active_token,
  new_password,
  confirm_new_password,
}: ResetPasswordRequest) => {
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'account/forgot-password/updatePassword',
    method: 'post',
    data: {
      active_token,
      new_password,
      confirm_new_password,
    } as any,
  };

  const response = await httpRequest.request(options, false);
  return response;
};

export const getToken = async () => {
  const token: RefreshTokenRequest | any = getTokenFromLocal();
  const options: AxiosRequestConfig<AxiosDefaults> = {
    url: 'auth/refresh-token',
    method: 'post',
    data: token,
  };

  const response = await httpRequest.request(options, false);
  if (!SuccessCode.includes(response.status)) {
    // has status mean has error code 400
    return null;
  }
  return response;
};
