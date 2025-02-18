import React, { useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Coffee, DollarSign,  AlertTriangle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import type { AppDispatch } from '../../store/store';

import {
  fetchProductTop,
  fetchEarlyDate,
  fetchEarnings,
  fetchTotalLiquidation,
  fetchTotalDeposits,
} from '../../features/dashboard/dashboardSlice';

  const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
      totalLiquidation,
      totalDeposits,
      isLoading,
      error,
    } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    // Obtener los datos del dashboard al montar el componente
    dispatch(fetchProductTop({ month: 10, year: 2023 })); // Ejemplo: Octubre 2023
    dispatch(fetchEarlyDate());
    dispatch(fetchEarnings({ month: 10, year: 2023 })); // Ejemplo: Octubre 2023
    dispatch(fetchTotalLiquidation());
    dispatch(fetchTotalDeposits());
  }, [dispatch]);

  // Mapear los datos de Redux a la estructura que espera el componente
  const data = {
    deudas: totalLiquidation || 0, // Usar totalLiquidation como deudas
    pagos: totalDeposits || 0, // Usar totalDeposits como pagos
    historial: [
      { mes: 'Ene', deudas: 800, pagos: 500 },
      { mes: 'Feb', deudas: 900, pagos: 600 },
      { mes: 'Mar', deudas: 800, pagos: 700 },
    ],
  };

  // Componente para cuando no hay datos
  const NoDataComponent = () => (
    <div className="flex flex-col items-center justify-center h-96 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200">
      <AlertTriangle size={64} className="text-amber-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700">Sin datos disponibles</h3>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        No se encontraron registros de transacciones en el sistema. 
        Por favor, agrega algunas transacciones para visualizar tus datos.
      </p>
    </div>
  );

  interface MainMetricCardProps {
    label: string;
    amount: number;
    color: string;
    icon: JSX.Element;
    trend: string;
    isPositive: boolean;
  }

  const MainMetricCard = ({ label, amount, color, icon, trend, isPositive }: MainMetricCardProps) => {
    const TrendIcon = isPositive ? ArrowUpCircle : ArrowDownCircle;

    return (
      <div 
        className={`p-6 rounded-2xl overflow-hidden relative transition-all duration-700 transform ${!isLoading ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        style={{ backgroundColor: color }}
      >
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white text-opacity-90 font-medium text-lg">{label}</p>
              <h2 className="text-4xl font-bold text-white mt-1 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                ${amount.toLocaleString()}
              </h2>
            </div>

            <div className="p-3 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl">
              {React.cloneElement(icon, { size: 32, className: "text-white" })}
            </div>
          </div>

          {trend && (
            <div className="flex items-center mt-6 text-white bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
              <TrendIcon size={18} className={isPositive ? "text-green-200" : "text-red-200"} />
              <span className="ml-2 text-sm font-medium">{trend}% {isPositive ? "más que el mes pasado" : "menos que el mes pasado"}</span>
            </div>
          )}
        </div>

        {/* Animación de entrada */}
        <div 
          className={`absolute inset-0 bg-white transition-all duration-1000 ${!isLoading ? 'translate-x-full' : 'translate-x-0'}`}
          style={{ transitionDelay: '300ms' }}
        ></div>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rounded-2xl bg-white shadow-sm p-6 mb-8 transition-all duration-700 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8 sticky top-0 z-10 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Financiero</h1>
          <div className="text-sm font-medium text-gray-500">Cafetería "El Aroma"</div>
        </div>

        {data ? (
          <>
            {/* Tarjetas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <MainMetricCard 
                label="Total que Debes" 
                amount={data.deudas} 
                color="#7c3aed" 
                icon={<DollarSign />}
                trend="12.5"
                isPositive={false}
              />
              <MainMetricCard 
                label="Total Pagado" 
                amount={data.pagos} 
                color="#0891b2" 
                icon={<Coffee />}
                trend="8.3"
                isPositive={true}
              />
            </div>

            {/* Panel informativo */}
            <div className={`bg-white rounded-2xl shadow-sm p-6 mb-8 transition-all duration-700 transform ${!isLoading ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                 style={{ transitionDelay: '400ms' }}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen Financiero</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Balance Actual</p>
                  <p className={`text-2xl font-bold ${data.pagos - data.deudas >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    ${(data.pagos - data.deudas).toLocaleString()}
                  </p>

                  <div className="mt-4 flex items-center">
                    <div className="text-xs text-gray-500">Variación</div>
                    <div className={`ml-auto text-sm font-medium ${data.pagos - data.deudas >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {data.pagos - data.deudas >= 0 ? '+' : ''}{Math.round((data.pagos - data.deudas) / data.deudas * 100)}%
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Porcentaje Pagado</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold text-gray-800">
                      {Math.round((data.pagos / data.deudas) * 100)}%
                    </p>
                    <p className="text-sm text-gray-500 ml-2 mb-1">de ${data.deudas.toLocaleString()}</p>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${Math.round((data.pagos / data.deudas) * 100)}%`,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <NoDataComponent />
        )}
      </div>
    </div>
  );
};

export default Dashboard;