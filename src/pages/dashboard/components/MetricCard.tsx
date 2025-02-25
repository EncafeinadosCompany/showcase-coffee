import { MainMetricCardProps } from "@/types/dashboard/dashboardModel";
import * as React from "react";

const MetricCard = ({  label,  amount,  color,  icon,  isLoading, trend, isPositive }: MainMetricCardProps) => {
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

        {trend && isPositive !== undefined && (
          <div className="items-center mt-6 text-white bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
            {isPositive ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-200">
                <circle cx="12" cy="12" r="10" />
                <polyline points="16 12 12 8 8 12" />
                <line x1="12" y1="16" x2="12" y2="8" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-200">
                <circle cx="12" cy="12" r="10" />
                <polyline points="8 12 12 16 16 12" />
                <line x1="12" y1="8" x2="12" y2="16" />
              </svg>
            )}
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

export default MetricCard;