import { useState, useEffect } from 'react';
import { useAppSelector } from "@/hooks/useAppSelector";
import { Coffee, Clock, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="p-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur">
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="p-3 bg-amber-100 rounded-full">
        <Icon className="w-6 h-6 text-amber-800" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Card>
);

export const HomePage = () => {
  const employee = useAppSelector((state: { auth: { employee: any } }) => state.auth.employee);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  return (
    <div className="">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0  bg-cover bg-center opacity-10" />
        
        <div className="max-w-7xl mx-auto px-1 sm:px-1 lg:px-8 p-10">
          <div className={`text-center  space-y-8 transform transition-all duration-1000 ${showWelcome ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
              <span className="block text-amber-800">Bienvenido a la</span>
              <span className="block text-amber-600 mt-2">Vitrina de Encafeinados</span>
            </h1>
            
            {employee && (
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium">
                <Coffee className="w-4 h-4 mr-2" />
                Tienda # {employee.id_store ?? "No asignado"}
              </div>
            )}
            
            <p className=" text-xl text-gray-600 max-w-2xl mx-auto">
              Donde cada taza cuenta una historia y cada momento se convierte en un recuerdo especial
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-1">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Clock}
            title="Servicio Rápido"
            description="Atención ágil y eficiente para que disfrutes tu café sin esperas"
          />
          <FeatureCard
            icon={Star}
            title="Calidad Premium"
            description="Los mejores granos seleccionados para una experiencia única"
          />
          <FeatureCard
            icon={Users}
            title="Ambiente Acogedor"
            description="Un espacio diseñado para tu comodidad y disfrute"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;