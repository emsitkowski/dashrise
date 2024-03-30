export interface Transaction {
  id?: string;
  category?: string;
  date: string;
  type: string;
  name: string;
  value: number | undefined;
}

export interface Tab {
  label: string;
}

export interface userCredentials {
  name: string;
  password: string;
}
