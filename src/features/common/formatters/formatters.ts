import { format } from "date-fns";

// Function to format a date string
export const formatDate = (dateString: string) => {
  if (!dateString) return "Fecha inválida";
  return format(new Date(dateString), "dd/MM/yyyy HH:mm");
};

// Function to format a currency string
export const formatCurrency = (amount: string | number | null) => {
  if (!amount) return "0,0";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(Number(amount));
};
