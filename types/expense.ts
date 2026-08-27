export interface Expense {
  id: number;
  amount: number;
  category: string;
  createdAt: string;
  userId: number;
}

export interface ExpensePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ExpenseListResponse {
  items: Expense[];
  pagination: ExpensePagination;
}