type Pagination = {
    totalPages: number;
    lastPage: number,
    currentPage: number,
    perPage: number,
    prev: number,
    next: number
};

type PaginationParams = {
    limit: string;
    page: string;
}