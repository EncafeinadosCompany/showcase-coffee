import { useEffect, useState } from 'react';
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

import MetricCard from './components/MetricCard';
import NoData from './components/NoData';
import FinancialSummary from './components/FinancialSummary';
import TopProductsChart from './components/TopProductsChart';
import { Coffee, DollarSign, HandCoins } from 'lucide-react';
import { fetchStoresID } from '@/features/companies/storeSlice';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employee = useAppSelector((state) => state.auth.employee);
  const [ store, setStores] = useState<{name?: string } | null>(null);

  const {
    totalLiquidation,
    totalDeposits,
    topProducts,
    earnings,
    isLoading,
    error,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (employee) {
      dispatch(fetchStoresID(String(employee.id_store))).then((response) => {
        setStores(response.payload);
      });
    }

    dispatch(fetchProductTop({ month: currentMonth, year: currentYear }));
    dispatch(fetchEarlyDate());
    dispatch(fetchEarnings({ month: currentMonth, year: currentYear }));
    dispatch(fetchTotalLiquidation());
    dispatch(fetchTotalDeposits());
  }, [dispatch]);

  const data = {
    deudas: totalLiquidation || 0,
    pagos: totalDeposits || 0,
    ganancias: earnings || 0,
    historial: [
      { mes: "Ene", deudas: 800, pagos: 500 },
      { mes: "Feb", deudas: 900, pagos: 600 },
      { mes: "Mar", deudas: 800, pagos: 700 },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rounded-3xl bg-white border border-amber-100 p-4 w-full h-full transition-all duration-700 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-2 top-0 z-10 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Finanzas de  {store?.name || "Cargando..."} </h1>
        </div>

        {data ? (
          <>
            {/* Tarjetas principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              <MetricCard
                label="Deuda Actual"
                amount={data.deudas}
                color="#7c3aed"
                icon={<DollarSign />}
                isLoading={isLoading}
              />
              <MetricCard
                label="Total Pagado"
                amount={data.pagos}
                color="#0891b2"
                icon={<Coffee />}
                isLoading={isLoading}
              />
              <MetricCard
                label="Total Ganancias"
                amount={data.ganancias}
                color="#FF7F50"
                icon={<HandCoins />} 
                isLoading={isLoading}
              />
            </div>

            {/* Resumen Financiero */}
            <FinancialSummary data={data} isLoading={isLoading} />

            {/* Gráfica de Top 5 Productos */}
            <TopProductsChart topProducts={topProducts} isLoading={isLoading} />
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
