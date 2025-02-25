import React, { useState } from 'react';

interface FinancialSummaryProps {
  data: {
    totalBrands: number;
    totalSalesMonth: number; 
    totalSalesYear: number; 
    salesCountMonth: number; 
    salesCountYear: number; 
  };
  isLoading: boolean;
}

const FinancialSummary = ({ data, isLoading }: FinancialSummaryProps) => {
  const { totalBrands, totalSalesMonth, totalSalesYear, salesCountMonth, salesCountYear } = data;
  
  // Estados para controlar qué período mostrar
  const [showMonthlySales, setShowMonthlySales] = useState(true);
  const [showMonthlySalesCount, setShowMonthlySalesCount] = useState(true);

  // Función para formatear números grandes
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div
      className={` p-6  transition-all duration-700 transform ${
        !isLoading ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: '400ms' }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-indigo-600 mr-3" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        Resumen Financiero
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total de Marcas */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-indigo-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Total de Marcas</p>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-gray-800">
                  {totalBrands.toLocaleString()}
                </p>
                <span className="ml-2 text-sm font-medium text-indigo-500">marcas activas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ventas (Mes/Año) */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-emerald-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            
            <div className="flex space-x-1 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-1 text-xs font-medium ${showMonthlySales ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-200`}
                onClick={() => setShowMonthlySales(true)}
              >
                Mes
              </button>
              <button 
                className={`px-3 py-1 text-xs font-medium ${!showMonthlySales ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-200`}
                onClick={() => setShowMonthlySales(false)}
              >
                Año
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Ventas {showMonthlySales ? 'del Mes' : 'del Año'}
            </p>
            <div className="relative h-16">
              <div className={`absolute w-full transition-all duration-500 transform ${showMonthlySales ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                <p className="text-4xl font-bold text-gray-800">
                  {formatCurrency(totalSalesMonth)}
                </p>
              </div>
              <div className={`absolute w-full transition-all duration-500 transform ${!showMonthlySales ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-4xl font-bold text-gray-800">
                  {formatCurrency(totalSalesYear)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conteo de Ventas (Mes/Año) */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-purple-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" 
                />
              </svg>
            </div>
            
            <div className="flex space-x-1 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-1 text-xs font-medium ${showMonthlySalesCount ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-200`}
                onClick={() => setShowMonthlySalesCount(true)}
              >
                Mes
              </button>
              <button 
                className={`px-3 py-1 text-xs font-medium ${!showMonthlySalesCount ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'} transition-colors duration-200`}
                onClick={() => setShowMonthlySalesCount(false)}
              >
                Año
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Transacciones {showMonthlySalesCount ? 'del Mes' : 'del Año'}
            </p>
            <div className="relative h-16">
              <div className={`absolute w-full transition-all duration-500 transform ${showMonthlySalesCount ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                <p className="text-4xl font-bold text-gray-800">
                  {salesCountMonth.toLocaleString()}
                </p>
              </div>
              <div className={`absolute w-full transition-all duration-500 transform ${!showMonthlySalesCount ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-4xl font-bold text-gray-800">
                  {salesCountYear.toLocaleString()}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FinancialSummary;