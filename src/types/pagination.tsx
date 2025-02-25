export interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface PaginationActions {
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
    setTotalItems: (totalItems: number) => void;
}

export interface PaginationHookResult extends PaginationState, PaginationActions {
    handlePageChange: (page: number) => void;
    handleItemsPerPageChange: (itemsPerPage: number) => void;
}