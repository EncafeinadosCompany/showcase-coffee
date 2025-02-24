// Archivo: src/hooks/usePagination.ts
import { useState, useEffect } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialItemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

interface PaginationResult {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setTotalItems: (count: number) => void;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (itemsPerPage: number) => void;
  paginatedData: <T>(data: T[]) => T[];
}

export function usePagination<_T>({
  initialPage = 1,
  initialItemsPerPage = 10,
  totalItems = 0,
  onPageChange
}: PaginationOptions = {}): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [total, setTotal] = useState(totalItems);

  // Reset a la primera página cuando cambia el tamaño de página
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Manejar cambio de elementos por página
  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
  };

  // Función helper para paginar cualquier array de datos
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