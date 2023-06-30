export interface ResetPasswordRequest {
  active_token: string;
  new_password: string;
  confirm_new_password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}
