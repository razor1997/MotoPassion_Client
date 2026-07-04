
export interface VehicleExpense {
  id: string;
  vehicleId: string;
  title: string;
  description?: string;
  cost: number|null;
  date: string;
  category: number;
  createdAt: string;
  mileage: number|null;
  factureImageUrl: string;
}

export interface VehicleExpenseCreate {
  vehicleId: string;
  title: string;
  description?: string;
  cost: number;
  date: string;
  category: number;
  mileage: number;
  factureImageUrl: string;
}
