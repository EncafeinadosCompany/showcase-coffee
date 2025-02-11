import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Provider } from "@/types/companies/provider";

interface ProviderTableProps {
  providers: Provider[];
  onProviderClick: (provider: Provider) => void;
}

export const ProviderTable = React.memo(({ providers, onProviderClick }: ProviderTableProps) => (
  <Card className="bg-white/80 backdrop-blur">
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>NIT</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow
              key={provider.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onProviderClick(provider)}
            >
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell>{provider.nit}</TableCell>
              <TableCell>{provider.email}</TableCell>
              <TableCell>{provider.phone}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    provider.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {provider.status ? "Activo" : "Inactivo"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
));