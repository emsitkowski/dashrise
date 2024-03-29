export interface FormData {
  [name: string]: string; // Add index signature
  value: string;
}

export interface Tab {
  label: string;
}

export interface userCredentials {
  name: string;
  password: string;
}
