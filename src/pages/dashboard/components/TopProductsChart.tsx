import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Coffee } from 'lucide-react';

interface ProductData {
  total: string;
  id_variant_products: number;
  variantProduct: {
    grammage: string;
    product: {
      name: string;
      image_url: string;
    }
  }
}

interface TopProductsChartProps {
  topProducts: ProductData[] | null;
  isLoading: boolean;
}

const TopProductsChart = ({ topProducts, isLoading }: TopProductsChartProps) => {
  const chartData = topProducts 
    ? topProducts
        .slice(0, 5)
        .map(product => ({
          name: `${product.variantProduct.product.name} (${product.variantProduct.grammage})`,
          value: parseInt(product.total),
          id: product.id_variant_products
        }))
        .sort((a, b) => b.value - a.value)
    : [];

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        const product = topProducts?.find(
          (p) => `${p.variantProduct.product.name} (${p.variantProduct.grammage})` === label
        );
    
        return (
          <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-100 flex items-center space-x-3">
            {product && product.variantProduct.product.image_url && (
              <img
                src={product.variantProduct.product.image_url}
                alt={label}
                className="w-24 h-24 rounded-lg object-cover border"
              />
            )}
            <div>
              <p className="font-medium text-gray-800">{label}</p>
              <p className="text-violet-600 font-medium">{payload[0].value} unidades vendidas</p>
            </div>
          </div>
        );
      }
      return null;
    };
    

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-6 mb-8 transition-all duration-700 transform ${
        !isLoading ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: '500ms' }}
    >
      <div className="flex items-center mb-6">
        <Coffee size={24} className="text-violet-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-800">Top 5 Productos Más Vendidos</h2>
      </div>

      {chartData.length > 0 ? (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12, fill: '#4B5563' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#4B5563' }}
                label={{ value: 'Unidades vendidas', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#4B5563' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                barSize={40}
                background={{ fill: '#f5f5f5' }}
              >
                {chartData.map((_entry, index) => (
                  <rect
                    key={`rect-${index}`}
                    fill={index === 0 ? '#7c3aed' : '#9F7AEA'}
                    fillOpacity={1 - index * 0.15}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <Coffee size={48} className="text-gray-300 mb-3" />
          <p className="text-gray-500">No hay datos de productos disponibles</p>
        </div>
      )}
    </div>
  );
};

export default TopProductsChart;