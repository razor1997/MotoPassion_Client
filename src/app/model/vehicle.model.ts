export interface Vehicle {
  id: string;
  userId: string;
  category: number;
  mark: string;
  model: string;
  year: number;
  horsePower: number;
  engineCapacity: number;
  fuelType: number;
  mileage?: number;
  vin?: string;
  createdAt: string;
  imageUrl:string;
  dateInsurance: string;
  dateInspection: string;
}
export interface VehicleCreate {
  userId: string;
  category: number;
  mark: string;
  model: string;
  year: number;
  horsePower: number;
  engineCapacity: number;
  fuelType: number;
  mileage?: number;
  vin?: string;
  imageUrl: string;
  dateInsurance: string;
  dateInspection: string;
}
export interface VehicleUpdate {
  userId: string;
  category: number;
  mark: string;
  model: string;
  year: number;
  horsePower: number;
  engineCapacity: number;
  fuelType: number;
  mileage?: number;
  vin?: string;
  imageUrl: string;
  dateInsurance: string;
  dateInspection: string;
}

