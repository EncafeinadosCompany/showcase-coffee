export type EmployeeType = "store" | "provider";

export interface Employee {
  id: number;
  id_user?: number | null;
  identification?: string | null;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  type:  "store" | "provider",
  id_store?: number | null;
  id_provider?: number | null;
  status: boolean;
}
