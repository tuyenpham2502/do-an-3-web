export interface LoginRequest {
  email_id: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  permissions: string[];
}
