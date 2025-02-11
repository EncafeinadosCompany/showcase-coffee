import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Provider } from "@/types/companies/provider";

interface ProviderDetailsProps {
  provider: Provider;
  onClose: () => void;
}

export const ProviderDetails = React.memo(({ provider, onClose }: ProviderDetailsProps) => (
  <DialogContent className="max-w-2xl bg-white/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-600">
            Detalles del Proveedor
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-amber-700">Nombre:</span>
              <p className="text-gray-700">{provider.name}</p>
            </div>
            <div>
              <span className="font-semibold text-amber-700">NIT:</span>
              <p className="text-gray-700">{provider.nit}</p>
            </div>
            <div>
              <span className="font-semibold text-amber-700">Email:</span>
              <p className="text-gray-700">{provider.email}</p>
            </div>
            <div>
              <span className="font-semibold text-amber-700">Teléfono:</span>
              <p className="text-gray-700">{provider.phone}</p>
            </div>
          </div>
  
          <div>
            <span className="font-semibold text-amber-700">Dirección:</span>
            <p className="text-gray-700">{provider.address}</p>
          </div>
  
          <div>
            <span className="font-semibold text-amber-700">Estado:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                provider.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {provider.status ? "Activo" : "Inactivo"}
            </span>
          </div>
  
          {provider.bankAccounts && provider.bankAccounts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-amber-800 mb-3">
                Cuentas Bancarias:
              </h3>
              <div className="grid gap-3">
                {provider.bankAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="bg-amber-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="font-semibold text-amber-800">Banco:</span>
                        <p className="text-gray-700">{account.bank}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-800">
                          Tipo de Cuenta:
                        </span>
                        <p className="text-gray-700">{account.type_account}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold text-amber-800">
                          Número de Cuenta:
                        </span>
                        <p className="text-gray-700">{account.bank_account}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={onClose} className="bg-amber-600 hover:bg-amber-800 rounded-full">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
));