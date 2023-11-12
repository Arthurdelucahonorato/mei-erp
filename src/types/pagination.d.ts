type Pagination = {
    page: number,
    limit: number,
    totalItems: number;
    totalPages: number;
    prevPage: number,
    nextPage: number
};

type PaginationParams = {
    limit: number;
    page: number;
}