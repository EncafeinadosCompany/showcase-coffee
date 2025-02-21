interface FinancialSummaryProps {
  data: {
    deudas: number;
    pagos: number;
  };
  isLoading: boolean;
}

const FinancialSummary = ({ data, isLoading }: FinancialSummaryProps) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6  transition-all duration-700 transform ${!isLoading ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: '400ms' }}
    >
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
              {data.deudas === 0 ? '100%' : `${Math.round((data.pagos / data.deudas) * 100)}%`}
            </p>
            <p className="text-sm text-gray-500 ml-2 mb-1">
              {data.deudas === 0 ? "del 100%" : `de $${data.deudas.toLocaleString()}`}
            </p>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-1000 ease-out"
                style={{
                  width: `${data.deudas === 0 ? 100 : Math.min(100, Math.round((data.pagos / data.deudas) * 100))}%`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;