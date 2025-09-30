export type MovieStatus = "in_theaters" | "upcoming" | "catalog";

export interface Movie {
  id: string;
  title: string;
  slug: string;
  synopsis?: string;
  releaseDate?: string;
  posterUrl?: string;
  bannerUrl?: string;
  trailerUrl?: string;
  videoUrls?: string[];
  studio?: string;
  status?: MovieStatus;
  genre?: string;
  runtimeMinutes?: number;
  createdAt?: string;
  updatedAt?: string;
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
