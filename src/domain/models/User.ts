export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface GetUsersResponse {
  items: UserResponse[];
  total: number;
  page: number;
  limit: number;
}
