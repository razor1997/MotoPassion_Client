export interface Vehicle {
  id: string;
  userId: string;
  category: number;
  make: string;
  model: string;
  year: number;
  horsePower: number;
  engineCapacity: number;
  fuelType: number;
  mileage?: number;
  vin?: string;
  createdAt: string;
}
