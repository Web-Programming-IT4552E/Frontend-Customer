export interface RegisterUserRequest {
  email: string;
  password: string;
  phone: string;
  fullname: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ChangeProfileRequest {
  email: string;
  password: string;
  birthday: string;
  address: string;
  avatar: string;
}
