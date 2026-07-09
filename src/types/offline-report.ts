export interface OfflineReport {
  id: string;
  animalType: 'Dog' | 'Cat' | 'Other';
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  synced: boolean;
}
