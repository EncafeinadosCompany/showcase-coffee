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
  fetchTotalBrands,
  fetchTotalSalesByMonth,
  fetchTotalSalesByYear,
  fetchSalesCountByMonth,
  fetchSalesCountByYear,
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
  const [_store, setStores] = useState<{ name?: string } | null>(null);

  const {
    totalLiquidation,
    totalDeposits,
    topProducts,
    earnings,
    totalBrands,
    totalSalesMonth,
    totalSalesYear,
    salesCountMonth,
    salesCountYear,
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
    dispatch(fetchTotalBrands());
    dispatch(fetchTotalSalesByMonth({ month: currentMonth, year: currentYear }));
    dispatch(fetchTotalSalesByYear({ year: currentYear }));
    dispatch(fetchSalesCountByMonth({ month: currentMonth, year: currentYear }));
    dispatch(fetchSalesCountByYear({ year: currentYear }));
  }, [dispatch]);

  const data = {
    deudas: totalLiquidation || 0,
    pagos: totalDeposits || 0,
    ganancias: earnings || 0,
    totalBrands: totalBrands || 0,
    totalSalesMonth: totalSalesMonth || 0,
    totalSalesYear: totalSalesYear || 0,
    salesCountMonth: salesCountMonth || 0,
    salesCountYear: salesCountYear || 0,
    historial: [
      { mes: "Ene", deudas: 800, pagos: 500 },
      { mes: "Feb", deudas: 900, pagos: 600 },
      { mes: "Mar", deudas: 800, pagos: 700 },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rounded-3xl w-full h-full transition-all duration-700 mt-5">
      <div className="max-w-7xl mx-auto">

        {data ? (
          <>
            {/* Tarjetas principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            <div className='mt-5 mb-5'>
              <FinancialSummary data={data} isLoading={isLoading} />
            </div>
            <div>
              <TopProductsChart topProducts={topProducts} isLoading={isLoading} />

            </div>
          </>

        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
