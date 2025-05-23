import * as React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchEmployees } from "@/features/users/employees/employeeSlice";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const useEmployees = () => {
  const dispatch = useAppDispatch();
  const { employees, isLoading, error } = useAppSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = employees.filter((employee) => employee.type === "provider");

  return { employees: filteredEmployees, isLoading, error };
};

type SelectEmployeeProps = {
  onSelect: (employeeId: number) => void;
  update: boolean;
  onAddEmployee?: () => void;
};

export default function SelectEmployee({ onSelect, update, onAddEmployee }: SelectEmployeeProps) {
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
      <p className="text-sm text-muted-foreground">Empleados:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[80%] justify-start rounded-xl">
            {selectedEmployee ? (
              <>{selectedEmployee.name}</>
            ) : (
              <>Seleccione un empleado</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 relative" side="right" align="start">
          {/* Botón de agregar empleado */}
          <div className="absolute p-1 right-2">
            <Button
              variant="ghost"
              size="icon"
              title="Agregar empleado"
              onClick={onAddEmployee} // Abrir la modal de agregar empleados
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

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
              <ScrollArea className="h-24">
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
                        onSelect(employee.id);
                        setOpen(false);
                      }}
                    >
                      {`${employee.name} ${employee.last_name}`}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        title="Agregar empleado"
        onClick={onAddEmployee}
        className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-medium transition-colors duration-200 px-3 py-2"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}