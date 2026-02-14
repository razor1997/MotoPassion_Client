export const VEHICLE_PETROL = [
  1, 'Benzyna',
  2, 'Diesel',
  3, 'Hybryda',
  4, 'Elektryk',
  5, 'LPG',
  99, 'Inne'
] as const;
export const categories = [
  { id: 1, name: 'Samochód' },
  { id: 2, name: 'Motocykl' },
  { id: 3, name: 'Ciężarówka' },
  { id: 4, name: 'Skuter' },
  { id: 99, name: 'Inne' }
]as const;

export const fuelTypes = [
  { id: 1, name: 'Benzyna' },
  { id: 2, name: 'Diesel' },
  { id: 3, name: 'Hybryda' },
  { id: 4, name: 'Elektryk' },
  { id: 5, name: 'LPG' },
  { id: 99, name: 'Inne' }
]as const;
