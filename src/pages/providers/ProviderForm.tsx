import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Provider, BankAccount } from "@/types/companies/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Landmark } from "lucide-react";


const BANK_OPTIONS = [
  "Banco de Bogotá",
  "Banco Popular",
  "Bancolombia",
  "Citibank",
  "BBVA Colombia",
  "Banco de Occidente",
  "Banco Caja Social",
  "Davivienda",
  "Scotiabank Colpatria",
];

const ACCOUNT_TYPES = ["Cuenta Corriente", "Cuenta de Ahorros"];

interface ProviderFormProps {
  initialData?: Omit<Provider, "id">;
  onSubmit: (form: Omit<Provider, "id">) => void;
  onClose: () => void;
  isEditing: boolean;
}

export const ProviderForm: React.FC<ProviderFormProps> = ({ initialData, onSubmit, onClose, isEditing }) => {
  const [form, setForm] = useState<Omit<Provider, "id">>(initialData || {
    name: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    bankAccounts: [],
    status: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    // Validar NIT
    if (!form.nit.trim()) {
      newErrors.nit = "El NIT es obligatorio.";
    } else if (!/^\d+$/.test(form.nit)) {
      newErrors.nit = "El NIT debe ser un número válido.";
    }

    // Validar correo electrónico
    if (!form.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }

    // Validar teléfono
    if (!form.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(form.phone)) {
      newErrors.phone = "El teléfono debe ser un número válido.";
    }

    // Validar dirección
    if (!form.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }

    // Validar cuentas bancarias
    form.bankAccounts.forEach((account, index) => {
      if (!account.bank.trim()) {
        newErrors[`bankAccounts[${index}].bank`] = "El banco es obligatorio.";
      }
      if (!account.type_account.trim()) {
        newErrors[`bankAccounts[${index}].type_account`] = "El tipo de cuenta es obligatorio.";
      }
      if (!account.bank_account.trim()) {
        newErrors[`bankAccounts[${index}].bank_account`] = "El número de cuenta es obligatorio.";
      } else if (!/^\d+$/.test(account.bank_account)) {
        newErrors[`bankAccounts[${index}].bank_account`] = "El número de cuenta debe ser un número válido.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleBankAccountChange = (index: number, key: keyof BankAccount, value: string) => {
    const updatedBankAccounts = [...form.bankAccounts];
    updatedBankAccounts[index] = { ...updatedBankAccounts[index], [key]: value };
    setForm({ ...form, bankAccounts: updatedBankAccounts });
    setErrors((prevErrors) => ({ ...prevErrors, [`bankAccounts[${index}].${key}`]: "" }));
  };

  const validateAccountNumber = (value: string) => {
    return value.replace(/[^\d]/g, "").slice(0, 20);
  };

  const removeBankAccount = (index: number) => {
    setForm({
      ...form,
      bankAccounts: form.bankAccounts.filter((_, i) => i !== index),
    });
  };

  const addBankAccount = () => {
    setForm({
      ...form,
      bankAccounts: [...form.bankAccounts, { bank_account: "", type_account: "", bank: "" }],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <ScrollArea className="h-[470px]">
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              name="nit"
              value={form.nit}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.nit && <p className="text-red-500 text-sm">{errors.nit}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Landmark className="mr-2 h-5 w-5" />
                <span className="font-semibold">Cuentas Bancarias</span>
              </div>
              <Button type="button" onClick={addBankAccount} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Cuenta
              </Button>
            </div>

            <ScrollArea className="h-[70px] pr-4">
              <div className="space-y-4">
                {form.bankAccounts.map((account, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-4">
                      <Label>Banco</Label>
                      <Select
                        value={account.bank}
                        onValueChange={(value) => handleBankAccountChange(index, "bank", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar banco" />
                        </SelectTrigger>
                        <SelectContent>
                          {BANK_OPTIONS.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors[`bankAccounts[${index}].bank`] && (
                        <p className="text-red-500 text-sm">{errors[`bankAccounts[${index}].bank`]}</p>
                      )}
                      {account.bank === "other" && (
                        <Input
                          placeholder="Ingrese el nombre del banco"
                          value={account.bank}
                          onChange={(e) => handleBankAccountChange(index, "bank", e.target.value)}
                          className="mt-2"
                        />
                      )}
                    </div>
                    <div className="col-span-3">
                      <Label>Tipo de Cuenta</Label>
                      <Select
                        value={account.type_account}
                        onValueChange={(value) => handleBankAccountChange(index, "type_account", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACCOUNT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[`bankAccounts[${index}].type_account`] && (
                        <p className="text-red-500 text-sm">{errors[`bankAccounts[${index}].type_account`]}</p>
                      )}
                    </div>
                    <div className="col-span-4">
                      <Label>Número de Cuenta</Label>
                      <Input
                        value={account.bank_account}
                        onChange={(e) =>
                          handleBankAccountChange(index, "bank_account", validateAccountNumber(e.target.value))
                        }
                        placeholder="0000000000"
                        className="w-full"
                      />
                      {errors[`bankAccounts[${index}].bank_account`] && (
                        <p className="text-red-500 text-sm">{errors[`bankAccounts[${index}].bank_account`]}</p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBankAccount(index)}
                        className="text-red-500 hover:text-red-700 mt-6"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch checked={form.status} onCheckedChange={(checked) => setForm({ ...form, status: checked })} />
            <Label>Activo</Label>
          </div>
          <Button type="submit">{isEditing ? "Actualizar Proveedor" : "Crear Proveedor"}</Button>
        </div>
      </form>
    </ScrollArea>
  );
};