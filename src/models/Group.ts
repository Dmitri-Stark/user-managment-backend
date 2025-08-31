export interface Group {
  id: number;
  name: string;
  status: 'empty' | 'notEmpty';
  created_at: Date;
}

export interface PaginatedGroups {
  groups: Group[];
  total: number;
  page: number;
  limit: number;
}