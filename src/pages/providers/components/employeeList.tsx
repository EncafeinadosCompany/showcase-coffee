import { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getByProvider } from "@/features/users/employees/employeeSlice";
import { Users } from "lucide-react";

// ELIMINAR INTERFAZ
type EmployeeListModalProps = { 
  providerId: number;
  onClose: () => void;
}

export const EmployeeListModal = ({ providerId, onClose }: EmployeeListModalProps) => {
  const { employees } = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        await dispatch(getByProvider(String(providerId)));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, [dispatch, providerId]);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Users size={64} className="text-amber-200 mb-4" />
      <h3 className="text-lg font-semibold text-amber-800 mb-2">No hay empleados vinculados</h3>
      <p className="text-gray-500 text-center max-w-sm">
        Este proveedor aún no tiene empleados registrados. Puedes agregar empleados usando el botón "Agregar Empleado".
      </p>
    </div>
  );

  const LoadingState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  );

  return (
    <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-amber-600 flex items-center gap-2">
          <Users size={24} />
          Empleados Vinculados
        </DialogTitle>
      </DialogHeader>

      {isLoading ? (
        <LoadingState />
      ) : employees.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollArea className="h-[500px] rounded-md">
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-amber-50/50">
                  <TableHead className="text-amber-800 font-semibold">Nombre</TableHead>
                  <TableHead className="text-amber-800 font-semibold">Apellido</TableHead>
                  <TableHead className="text-amber-800 font-semibold">Número de Documento</TableHead>
                  <TableHead className="text-amber-800 font-semibold">Teléfono</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow 
                    key={employee.id}
                    className="hover:bg-amber-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.last_name}</TableCell>
                    <TableCell>{employee.identification}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      )}

      <DialogFooter>
        <Button 
          onClick={onClose} 
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-full"
        >
          Cerrar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};