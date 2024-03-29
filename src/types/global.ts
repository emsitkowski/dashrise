export interface Transaction {
  id?: string;
  category?: string;
  date: string;
  type: string;
  name: string;
  value: number | undefined;
}

export interface FormData {
  [name: string]: string; // Add index signature
  value: string;
}

export interface FormFields {
  transactionType: string;
  fields: {
    [label: string]: string; // Add index signature
    type: string;
    name: string;
    placeholder: string;
  }[];
}

export interface Tab {
  label: string;
}

export interface userCredentials {
  name: string;
  password: string;
}
