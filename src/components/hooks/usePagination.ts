import { PaginationOptions, PaginationResult } from '@/types/common/pagination';
import { useState, useEffect } from 'react';

export function usePagination<_T>({
  initialPage = 1,
  initialItemsPerPage = 10,
  totalItems = 0,
  onPageChange
}: PaginationOptions = {}): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [total, setTotal] = useState(totalItems);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
  };

  const paginatedData = <T>(data: T[]): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    itemsPerPage,
    totalItems: total,
    setTotalItems: setTotal,
    handlePageChange,
    handleItemsPerPageChange,
    paginatedData
  };
}

export default usePagination;