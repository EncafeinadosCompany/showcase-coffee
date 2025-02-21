import React, { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getByProvider } from "@/features/users/employees/employeeSlice";

type EmployeeListModalProps = { 
  providerId: number;
  onClose: () => void;
}


export const EmployeeListModal = ({ providerId, onClose }: EmployeeListModalProps) => {
  // const [employees, setEmployees] = useState([]);
  const {employees} = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();


  useEffect(() => {
    console.log(providerId)

    dispatch(getByProvider(String(providerId)));
   
  }, [dispatch, providerId]);

  return (
    <DialogContent className="sm:max-w-[725px]">
      <DialogHeader>
        <DialogTitle>Empleados Vinculados</DialogTitle>
      </DialogHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Número de Documento</TableHead>
            <TableHead>Teléfono</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.last_name}</TableCell>
              <TableCell>{employee.identification}</TableCell>
              <TableCell>{employee.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  );
};