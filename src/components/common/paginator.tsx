import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Coffee } from 'lucide-react';

interface PaginatorProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
  showItemsPerPageSelector?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [10, 20, 50, 100],
  showItemsPerPageSelector = true,
  maxVisiblePages = 5,
  className = ''
}) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalItems <= itemsPerPage && !showItemsPerPageSelector) return null

  const getPageNumbers = (): number[] => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  const lastItemIndex = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <div className={` ${className}`}>
      <div className="flex flex-wrap justify-between items-center bg-amber-50 p-3 rounded-xl shadow-sm">
        
        {showItemsPerPageSelector && onItemsPerPageChange && (
          <div className="flex items-center space-x-2">
            <Coffee size={16} className="text-amber-700" />
            <span className="text-sm font-medium text-amber-800">Mostrar</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="border border-amber-300 rounded-full px-2 py-1 text-sm bg-white text-amber-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-sm text-amber-800">elementos</span>
          </div>
        )}
        
        {/* Botones de paginación con diseño mejorado */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
            
          {/* Botón para ir a la primera página */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-amber-700 hover:bg-amber-100 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
            aria-label="Primera página"
          >
            <ChevronsLeft size={18} />
          </button>
          
          {/* Botón para ir a la página anterior */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-amber-700 hover:bg-amber-100 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
            aria-label="Página anterior"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Números de página con animaciones */}
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 flex items-center rounded-full justify-center font-medium transition-all duration-200 transform hover:scale-105 ${
                page === currentPage 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'bg-white hover:bg-amber-100 text-amber-800 border border-amber-200'
              }`}
              aria-label={`Página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
          
          {/* Botón para ir a la página siguiente */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-amber-700 hover:bg-amber-100 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
            aria-label="Página siguiente"
          >
            <ChevronRight size={18} />
          </button>
          
          {/* Botón para ir a la última página */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-amber-700 hover:bg-amber-100 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
            aria-label="Última página"
          >
            <ChevronsRight size={18} />
          </button>
        </div>

      )}

        {/* Información de resultados con estilo mejorado */}
        {totalItems > 0 && (
          <div className="text-sm font-medium text-amber-800 px-3 py-1 bg-amber-100 rounded-full">
            Mostrando {' '} {lastItemIndex}{' '} de {' '}{totalItems} elementos
          </div>
        )}
      </div>
    </div>
  );
};

export default Paginator;