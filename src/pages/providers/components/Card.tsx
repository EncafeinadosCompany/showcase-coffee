import React from "react";
import { Building2, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Provider } from "@/types/companies/provider";

interface ProviderCardProps {
  provider: Provider;
  onClick: (provider: Provider) => void;
}

export const ProviderCard = React.memo(({ provider, onClick }: ProviderCardProps) => (
  <Card
    onClick={() => onClick(provider)}
    className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur"
  >
    <CardHeader>
      <CardTitle className="text-lg font-bold text-gray-800">
        {provider.name}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex items-center text-sm text-gray-600">
        <Building2 className="h-4 w-4 mr-2 text-amber-800" />
        <span>NIT: {provider.nit}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Mail className="h-4 w-4 mr-2 text-amber-800" />
        <span>{provider.email}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Phone className="h-4 w-4 mr-2 text-amber-800" />
        <span>{provider.phone}</span>
      </div>
    </CardContent>
    <CardFooter>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          provider.status
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {provider.status ? "Activo" : "Inactivo"}
      </span>
    </CardFooter>
  </Card>
))