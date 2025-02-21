import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { addEmployee } from "@/features/users/employees/employeeSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

type AddEmployeeModalProps = {
  providerId: number;
  onClose: () => void;
};

type FormData = {
  name: string;
  lastName: string;
  identification: string;
  email: string;
  phone: string;
};

// 📌 Esquema de validación con YUP
const validationSchema = yup.object().shape({
  name: yup.string().required("Su nombre es importante para nosotros"),
  lastName: yup.string().required("¿Y el apellido para cuando?"),
  identification: yup.string().required("Ingrese su identificación, por favor"),
  email: yup.string().email("Ingrese un email válido").required("El email es obligatorio"),
  phone: yup
    .string()
    .matches(/^3[0-9]{9}$/, "El teléfono debe tener 10 dígitos y comenzar con 3")
    .required("El teléfono es obligatorio"),
});

export const AddEmployeeModal = React.memo(({ providerId, onClose }: AddEmployeeModalProps) => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.auth.employee);

  // 📌 useForm con validaciones
  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({ resolver: yupResolver(validationSchema),
  });

  // 📌 Función que se ejecuta al enviar el formulario
  const onSubmit = async (data: FormData) => {
    const newEmployee = {
      ...data,
      type: "provider" as "provider",
      status: true,
      name: data.name,
      last_name: data.lastName,
      identification: data.identification,
      phone: data.phone,
      email: data.email || "",
      id_store: employee?.id_store || 0,
      id_provider: providerId,
      id_user: null,
      id_role: 2
    };

    dispatch(addEmployee(newEmployee));
    toast.success("Empleado agregado correctamente");
    onClose();
  };

  return (
    <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-amber-600">Vincular Empleado</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          {/* Nombre */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <div className="col-span-3">
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          </div>

          {/* Apellido */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Apellido
            </Label>
            <div className="col-span-3">
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Identificación */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="identification" className="text-right">
              Número de Documento
            </Label>
            <div className="col-span-3">
              <Input id="identification" {...register("identification")} />
              {errors.identification && <p className="text-red-500 text-sm">{errors.identification.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Correo electrónico
            </Label>
            <div className="col-span-3">
              <Input id="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>


          {/* Teléfono */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Teléfono
            </Label>
            <div className="col-span-3">
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Registrar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
});
