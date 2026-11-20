export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

export interface AuthUser {
  username: string;
  name: string;
}
