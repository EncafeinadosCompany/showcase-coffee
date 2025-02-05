export interface BankAccount {
  id?: number;
  bank_account: string;
  type_account: string;
  bank: string;
}

export interface Provider {
  id: number;
  name: string;
  nit: string;
  email: string;
  phone: string;
  address: string;
  bankAccounts: BankAccount[];
  status: boolean;
}
