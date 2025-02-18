import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchEmployees } from "@/features/users/employees/employeeSlice";

const useEmployees = () => {
  const dispatch = useAppDispatch();
  const { employees, isLoading, error } = useAppSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Filtrar los empleados que sean del tipo "provider"
  const filteredEmployees = employees.filter((employee) => employee.type === "provider");

  return { employees: filteredEmployees, isLoading, error };
};

type SelectEmployeeProps = {
  onSelect: (employeeId: number) => void;
  update: boolean;
};

export default function SelectEmployee({ onSelect , update }: SelectEmployeeProps) {
  const [open, setOpen] = React.useState(false);
  const { employees, isLoading, error } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = React.useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (update) {
      setSelectedEmployee(null);
    }
  }, [update]);

  

  return (
    <div className="flex items-center space-x-4 mt-6">
      <p className="text-sm text-muted-foreground">Empleados</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[80%] justify-start">
            {selectedEmployee ? (
              <>{selectedEmployee.name}</>
            ) : (
              <>Seleccione un empleado</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Buscar empleado..." />
            <CommandList>
              <CommandEmpty>
                {error
                  ? "Error al cargar los empleados."
                  : isLoading
                  ? "Cargando..."
                  : "No se encontraron empleados."}
              </CommandEmpty>
              <CommandGroup>
                {employees.map((employee) => (
                  <CommandItem
                    key={employee.id}
                    value={employee.name}
                    onSelect={() => {
                      setSelectedEmployee({
                        id: employee.id,
                        name: `${employee.name} ${employee.last_name}`,
                      });
                      onSelect(employee.id);  // Llamar a la función onSelect aquí
                      setOpen(false);
                    }}
                  >
                    {`${employee.name} ${employee.last_name}`}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
