import { AlertTriangle } from 'lucide-react';

const NoData = () => (
  <div className="flex flex-col items-center justify-center h-96 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200">
    <AlertTriangle size={64} className="text-amber-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-700">Sin datos disponibles</h3>
    <p className="text-gray-500 mt-2 text-center max-w-md">
      No se encontraron registros de transacciones en el sistema.
      Por favor, agrega algunas transacciones para visualizar tus datos.
    </p>
  </div>
);

export default NoData;