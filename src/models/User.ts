export interface User {
  id: number;
  name: string;
  email: string;
  status?: 'pending' | 'active' | 'blocked';
  created_at: Date;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
}