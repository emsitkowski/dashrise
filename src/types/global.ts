export interface Transaction {
  id?: string;
  category?: string;
  date: string;
  type: string;
  name: string;
  value: number;
}

export interface Category {
  id?: string;
  name: string;
  limitValue: number;
}

export interface CategoryExpense {
  category: string;
  totalValue: number;
  limitValue: number;
}

export interface Tab {
  label: string;
}
