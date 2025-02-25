import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';
import { Coffee, ShoppingCart, ArrowUpDown, Info } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sortMethod, setSortMethod] = useState<'value' | 'name'>('value');
  const [displayCount, setDisplayCount] = useState<number>(5);

  const processedData = topProducts 
    ? topProducts
        .map(product => ({
          name: `${product.variantProduct.product.name.length > 20 
            ? product.variantProduct.product.name.substring(0, 20) + '...' 
            : product.variantProduct.product.name} (${product.variantProduct.grammage})`,
          fullName: `${product.variantProduct.product.name} (${product.variantProduct.grammage})`,
          value: parseInt(product.total),
          id: product.id_variant_products,
          imageUrl: product.variantProduct.product.image_url
        }))
        .sort((a, b) => sortMethod === 'value' 
          ? b.value - a.value 
          : a.name.localeCompare(b.name))
    : [];
  
  const chartData = processedData.slice(0, displayCount);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const product = payload[0].payload;
      
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-purple-100 flex flex-col space-y-3 max-w-xs">
          <div className="flex items-center space-x-3">
            {product && product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={label}
                className="w-16 h-16 rounded-lg object-cover border"
              />
            )}
            <div>
              <p className="font-semibold text-gray-800">{product.fullName}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Ventas Totales</span>
              <span className="text-lg font-bold text-purple-600">{product.value}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Ranking</span>
              <span className="text-lg font-bold text-gray-800">#{processedData.findIndex(item => item.id === product.id) + 1}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data: any, index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 mb-8 transition-all duration-700 transform ${
        !isLoading ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: '500ms' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg mr-3">
            <Coffee size={20} className="text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Productos Más Vendidos</h2>
        </div>
        
        <div className="flex space-x-2">
          <div className="bg-gray-100 rounded-lg p-1 flex items-center text-sm">
            <button 
              className={`px-3 py-1 rounded-md transition-colors ${displayCount === 5 ? 'bg-white shadow-sm text-purple-700' : 'text-gray-600'}`}
              onClick={() => setDisplayCount(5)}
            >
              Top 5
            </button>
            <button 
              className={`px-3 py-1 rounded-md transition-colors ${displayCount === 10 ? 'bg-white shadow-sm text-purple-700' : 'text-gray-600'}`}
              onClick={() => setDisplayCount(10)}
            >
              Top 10
            </button>
          </div>
          
          <button 
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 flex items-center tooltip-container"
            onClick={() => setSortMethod(sortMethod === 'value' ? 'name' : 'value')}
            title={`Ordenar por ${sortMethod === 'value' ? 'nombre' : 'valor'}`}
          >
            <ArrowUpDown size={16} />
            <span className="sr-only">Cambiar orden</span>
          </button>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barGap={8}
              barSize={displayCount > 5 ? 28 : 38} 
              onClick={(data, index) => handleBarClick(data, index.dataKey === "value" ? index.index : -1)}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#C4B5FD" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                angle={-40}
                textAnchor="end"
                height={80}
                tick={{ fontSize: displayCount > 5 ? 10 : 12, fill: '#4B5563' }}
                tickMargin={10}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
                interval={0} 
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#4B5563' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
                tickCount={5}
                width={50}
                label={{ 
                  value: 'Unidades vendidas', 
                  angle: -90, 
                  position: 'insideLeft', 
                  style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 },
                  offset: -10
                }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0, 0, 0, 0.05)'}} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                background={{ fill: '#f5f5f5' }}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={activeIndex === index ? '#7C3AED' : 'url(#barGradient)'}
                    cursor="pointer"
                    stroke={activeIndex === index ? '#6D28D9' : 'none'}
                    strokeWidth={activeIndex === index ? 1 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="p-4 bg-gray-100 rounded-full mb-3">
            <ShoppingCart size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No hay datos de productos disponibles</p>
          <p className="text-gray-400 text-sm mt-1">Los productos más vendidos aparecerán aquí</p>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="mt-4 flex items-start space-x-2 text-xs text-gray-500">
          <Info size={14} className="mt-0.5 flex-shrink-0" />
          <p>
            Mostrando top {displayCount} productos. Haz clic en las barras para resaltar un producto
          </p>
        </div>
      )}
    </div>
  );
};

export default TopProductsChart;