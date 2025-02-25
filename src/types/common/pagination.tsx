export interface PaginationOptions {
    initialPage?: number;
    initialItemsPerPage?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
}

export interface PaginationResult {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    setTotalItems: (count: number) => void;
    handlePageChange: (page: number) => void;
    handleItemsPerPageChange: (itemsPerPage: number) => void;
    paginatedData: <T>(data: T[]) => T[];
}
