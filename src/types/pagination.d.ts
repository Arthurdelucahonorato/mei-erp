type Pagination = {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  prevPage: number;
  nextPage: number;
};

type PaginationParams = {
  perPage: string;
  page: string;
};

type PaginatedResult<T> = {
  content: T;
  pagination: Pagination;
};
