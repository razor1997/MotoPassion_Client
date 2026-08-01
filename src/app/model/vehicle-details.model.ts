export interface VehiclePublicPreviewDto {
  id: string;
  userId: string;
  mark: string;
  model: string;
  year: number;
  horsePower: number;
  engineCapacity: number;
  fuelType: number;
  mileage?: number | null;
  category: number;
  imageUrl?: string | null;
}

export interface VehicleOwnerPrivateDto {
  vin?: string | null;
  dateInsurance: string;
  dateInspection: string;
}

export interface VehicleExpenseHistoryItemDto {
  id: string;
  title: string;
  description?: string | null;
  cost: number;
  date: string;
  category: number;
  mileage: number;
  factureImageUrl?: string | null;
}

export interface VehicleDetailsDto {
  vehicle: VehiclePublicPreviewDto;
  privateData?: VehicleOwnerPrivateDto | null;
  expenses: VehicleExpenseHistoryItemDto[];
  isOwner: boolean;
}
