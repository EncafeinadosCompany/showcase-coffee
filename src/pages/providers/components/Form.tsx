import React, { useState, useCallback, useEffect } from "react";
import { Plus, Trash2, Landmark, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Provider, BankAccount } from "@/types/companies/provider";

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
  editingId: number | null;
  onSubmit: (formData: Omit<Provider, "id">) => Promise<void>;
  initialData?: Omit<Provider, "id">;
}

const FormField = React.memo(
  ({ label, name, icon: Icon, type = "text", value, error, onChange }: {
    label: string;
    name: string;
    icon: React.ElementType;
    type?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full text-amber-950 rounded-xl ${error ? "border-red-500" : ""}`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
);

FormField.displayName = "FormField";

export const ProviderForm = ({
  editingId,
  onSubmit,
  initialData,
}: ProviderFormProps) => {
  const [formData, setFormData] = useState<Omit<Provider, "id">>(
    initialData || {
      name: "",
      nit: "",
      email: "",
      phone: "",
      address: "",
      bankAccounts: [],
      status: true,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!editingId && !initialData) {
      setFormData({
        name: "",
        nit: "",
        email: "",
        phone: "",
        address: "",
        bankAccounts: [],
        status: true,
      });
    } else if (initialData) {
      setFormData({
        name: initialData.name || "",
        nit: initialData.nit || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        bankAccounts: initialData.bankAccounts || [],
        status: initialData.status ?? true,
      });
    }
  }, [editingId, initialData]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.nit.trim()) newErrors.nit = "El NIT es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
    }
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";

    formData.bankAccounts.forEach((account, index) => {
      if (!account.bank) newErrors[`bank-${index}`] = "Banco requerido";
      if (!account.bank_account)
        newErrors[`account-${index}`] = "Número de cuenta requerido";
      if (!account.type_account)
        newErrors[`type-${index}`] = "Tipo de cuenta requerido";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const handleBankAccountChange = useCallback(
    (index: number, key: keyof BankAccount, value: string) => {
      setFormData((prev) => {
        const updatedBankAccounts = [...prev.bankAccounts];
        updatedBankAccounts[index] = {
          ...updatedBankAccounts[index],
          [key]: value,
        };
        return {
          ...prev,
          bankAccounts: updatedBankAccounts,
        };
      });

      if (errors[`${key}-${index}`]) {
        setErrors((prev) => ({
          ...prev,
          [`${key}-${index}`]: "",
        }));
      }
    },
    [errors]
  );

  const validateAccountNumber = useCallback((value: string) => {
    return value.replace(/[^\d]/g, "").slice(0, 20);
  }, []);

  const removeBankAccount = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index),
    }));
  }, []);

  const addBankAccount = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      bankAccounts: [
        ...prev.bankAccounts,
        { bank_account: "", type_account: "", bank: "" },
      ],
    }));
  }, []);

  const handleSubmitWrapper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-amber-600">
          {editingId ? "Actualizar Proveedor" : "Nuevo Proveedor"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmitWrapper} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-amber-800">
              <FormField
                label="Nombre"
                name="name"
                icon={Building2}
                value={formData.name}
                error={errors.name}
                onChange={handleInputChange}
              />
              <FormField
                label="NIT"
                name="nit"
                icon={Building2}
                value={formData.nit}
                error={errors.nit}
                onChange={(e) => {
                  // Only allow numbers and dashes
                  const validValue = e.target.value.replace(/[^\d-]/g, '');
                  const event = { ...e, target: { ...e.target, name: 'nit', value: validValue } };
                  handleInputChange(event);
                }}
              />
              <FormField
                label="Correo Electrónico"
                name="email"
                icon={Mail}
                type="email"
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
              />
              <FormField
                label="Teléfono"
                name="phone"
                icon={Phone}
                value={formData.phone}
                error={errors.phone}
                onChange={(e) => {
                  // Only allow numbers and dashes
                  const validValue = e.target.value.replace(/[^\d-]/g, '');
                  const event = { ...e, target: { ...e.target, name: 'phone', value: validValue } };
                  handleInputChange(event);
                }}
              />
            </div>
          <div className="text-amber-800">
            <FormField
              label="Dirección"
              name="address"
              icon={MapPin}
              value={formData.address}
              error={errors.address}
              onChange={handleInputChange}
            />
          </div>

          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Landmark className="mr-2 h-5 w-5 text-amber-800" />
                  <span className="font-semibold text-amber-800">Cuentas Bancarias</span>
                </div>
                <Button
                  type="button"
                  onClick={addBankAccount}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-amber-800 hover:text-amber-800 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2 text-amber-800" />
                  Añadir Cuenta
                </Button>
              </div>

              <ScrollArea className="h-[250px] pr-4">
                <div className="space-y-6">
                  {formData.bankAccounts.map((account, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 bg-white rounded-xl shadow-sm"
                    >
                      <div className="md:col-span-4">
                        <Label className="mb-2 block text-amber-800">Banco</Label>
                        <Select
                          value={account.bank}
                          onValueChange={(value) =>
                            handleBankAccountChange(index, "bank", value)
                          }
                        >
                          <SelectTrigger className={`rounded-xl ${errors[`bank-${index}`] ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Seleccionar banco" />
                          </SelectTrigger>
                          <SelectContent>
                            {BANK_OPTIONS.map((bank) => (
                              <SelectItem key={bank} value={bank} className="rounded-lg">
                                {bank}
                              </SelectItem>
                            ))}
                            <SelectItem value="other">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors[`bank-${index}`] && (
                          <span className="text-sm text-red-500">
                            {errors[`bank-${index}`]}
                          </span>
                        )}
                      </div>
                      <div className="md:col-span-3">
                        <Label className="mb-2 block text-amber-800">Tipo de Cuenta</Label>
                        <Select
                          value={account.type_account}
                          onValueChange={(value) =>
                            handleBankAccountChange(index, "type_account", value)
                          }
                        >
                          <SelectTrigger className={`rounded-xl ${errors[`type-${index}`] ? "border-red-500" : ""}`}>
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
                        {errors[`type-${index}`] && (
                          <span className="text-sm text-red-500">
                            {errors[`type-${index}`]}
                          </span>
                        )}
                      </div>
                      <div className="md:col-span-4">
                        <Label className="mb-2 block text-amber-800">Número de Cuenta</Label>
                        <Input
                          value={account.bank_account}
                          onChange={(e) =>
                            handleBankAccountChange(
                              index,
                              "bank_account",
                              validateAccountNumber(e.target.value)
                            )
                          }
                          placeholder="0000000000"
                          className={`rounded-xl w-full ${errors[`account-${index}`] ? "border-red-500" : ""}`}
                        />
                        {errors[`account-${index}`] && (
                          <span className="text-sm text-red-500">
                            {errors[`account-${index}`]}
                          </span>
                        )}
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBankAccount(index)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
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

          <div className="flex items-center justify-end pt-4">
            <Button
              type="submit"
              className="bg-amber-700 rounded-full text-white transition-colors"
            >
              {editingId ? "Actualizar Proveedor" : "Registrar Proveedor"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProviderForm;