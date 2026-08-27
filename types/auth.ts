export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  name: string;
  role: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

export interface User {
  userId: number;
  name: string;
  role: string;
}