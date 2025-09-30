export interface Movie {
  id: string;
  title: string;
  slug: string;
  synopsis?: string;
  releaseDate?: string;
  posterUrl?: string;
  studio?: string;
  status?: string;
  genre?: string;
  runtimeMinutes?: number;
}

export interface Studio {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
}

export interface PageCopy {
  slug: string;
  title: string;
  content: string;
}

export interface PaginatedResponse<T> {
  page: number;
  totalPages: number;
  items: T[];
}
