import api from './api';
import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  SignupResponse,
} from '../types/auth.types';

export const authService = {
  async signin(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/signin', dto);
    return data;
  },

  async signup(dto: RegisterDto): Promise<SignupResponse> {
    const { data } = await api.post<SignupResponse>('/auth/signup', dto);
    return data;
  },
};
