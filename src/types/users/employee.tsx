export type EmployeeType = "store" | "provider";

export interface Employee {
  id: number;
  id_user: number;
  identification: string;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  type: EmployeeType;
  id_store?: number | null;
  id_provider?: number | null;
  status: boolean;
  created_at: string;
  updated_at: string;
}
