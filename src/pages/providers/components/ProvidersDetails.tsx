import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Provider } from "@/types/companies/provider";
import { EmployeeListModal } from "./employeeList";
import { AddEmployeeModal } from "./addEmployeeModal";
import { Users, UserPlus } from "lucide-react";

interface ProviderDetailsProps {
  provider: Provider;
  onClose: () => void;
}

export const ProviderDetails = React.memo(({ provider, onClose }: ProviderDetailsProps) => {
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  return (
    <>
      <DialogContent className="max-w-2xl bg-white/95 max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-600">
            Detalles del Proveedor
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2  scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-amber-50gap-4">
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
            <div>
              <span className="font-semibold text-amber-700">Dirección:</span>
              <p className="text-gray-700">{provider.address}</p>
            </div>
            <div>
              <span className="font-semibold text-amber-700">Estado:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${provider.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {provider.status ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => setShowEmployeeList(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center gap-2"
            >
              <Users size={20} />
              Ver Empleados
            </Button>
            <Button
              onClick={() => setShowAddEmployee(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center gap-2"
            >
              <UserPlus size={20} />
              Agregar Empleado
            </Button>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-amber-800 mb-2">
              Cuentas Bancarias:
            </h3>
            {provider.bankAccounts && provider.bankAccounts.length > 0 ? (
              <div className="max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-amber-50">
                <div className="grid gap-3">
                  {provider.bankAccounts.map((account, index) => (
                    <div
                      key={index}
                      className="bg-amber-50 p-4 rounded-lg shadow-sm hover:bg-amber-100 transition-colors"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-semibold text-amber-800 text-sm">Banco:</span>
                          <p className="text-gray-700">{account.bank}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-amber-800 text-sm">
                            Tipo de Cuenta:
                          </span>
                          <p className="text-gray-700">{account.type_account}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="font-semibold text-amber-800 text-sm">
                            Número de Cuenta:
                          </span>
                          <p className="text-gray-700">{account.bank_account}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No hay cuentas bancarias registradas.</p>
            )}
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={onClose} className="bg-amber-600 hover:bg-amber-800 rounded-full">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Employee List Dialog */}
      <Dialog open={showEmployeeList} onOpenChange={setShowEmployeeList}>
        <EmployeeListModal
          providerId={provider.id}
          onClose={() => setShowEmployeeList(false)}
        />
      </Dialog>


      <Dialog >
        <AddEmployeeModal
          providerId={provider.id}
          onClose={() => setShowAddEmployee(false)}
          isOpen={showAddEmployee} // Pasa el estado de apertura como prop
        />
      </Dialog>
    </>
  );
});