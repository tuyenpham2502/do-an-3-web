import { Roles } from '@/shared/enums/roles';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string | null;
  email: string | null;
  name: string | null;
  role: Roles | null;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}
