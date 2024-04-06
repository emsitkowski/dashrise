export interface Transaction {
  id?: string;
  category?: string;
  date: string;
  type: string;
  name: string;
  value: string | number;
}

export interface Category {
  id?: string;
  name: string;
  limitValue: string | number;
}

export interface Tab {
  label: string;
}

export interface userCredentials {
  name: string;
  password: string;
}
