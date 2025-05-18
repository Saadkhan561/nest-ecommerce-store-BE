export interface UserInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  isGuest: boolean;
  address: string;
  city: string;
}

export interface LoginResponse {
  accessToken: string;
  user: Partial<UserInterface>;
  message: string;
}

export interface SignupResponse {
  accessToken: string;
  user: UserInterface;
  message: string;
}

export interface UserUpdateResponse {
  user: UserInterface;
  message: string;
}

export interface ForgotPassResponse {
  message: string;
}
