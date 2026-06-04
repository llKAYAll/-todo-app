export const VEHICLE_TYPES = {
  MOTORCYCLE: 'MOTORCYCLE',
  SEDAN: 'SEDAN',
  SUV: 'SUV',
  HATCHBACK: 'HATCHBACK',
  TRUCK: 'TRUCK',
};

export const MOTORCYCLE_SIZES = {
  LOW: 'LOW_DISPLACEMENT',
  MEDIUM: 'MEDIUM_DISPLACEMENT',
  HIGH: 'HIGH_DISPLACEMENT',
};

export const GAME_LEVELS = [
  { level: 1, title: 'Başlangıç Satıcısı', minTransactions: 0, maxTransactions: 10 },
  { level: 2, title: 'Deneyimli Satıcı', minTransactions: 11, maxTransactions: 50 },
  { level: 3, title: 'Usta Tüccar', minTransactions: 51, maxTransactions: 150 },
  { level: 4, title: 'Megastore Sahibi', minTransactions: 151, maxTransactions: Infinity },
];

export const STARTING_BALANCE = 150000;
