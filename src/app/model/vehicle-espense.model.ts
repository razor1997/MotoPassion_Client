import {ExpenseCategory} from '../components/expenses-maintanance/expenses-utils/expenses-category';

export interface VehicleExpense {
  id: string;
  vehicleId: string;
  title: string;
  description?: string;
  cost: number;
  date: string;
  category: ExpenseCategory;
  createdAt: string;
}

export interface VehicleExpenseCreate {
  vehicleId: string;
  title: string;
  description?: string;
  cost: number;
  date: string;
  category: number;
}
