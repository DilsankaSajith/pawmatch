export type AnimalType = 'Dog' | 'Cat' | 'Other';

export type AdoptionStatus = 'Ready' | 'Pending' | 'Adopted';

export type HealthCondition = 'Healthy' | 'Recovering' | 'Critical';

export type Gender = 'Male' | 'Female';

export interface AnalysisResult {
  animalType: string;
  animalCount: number;
  visibleIssues: string[];
  environment: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
  description: string;
  timestamp?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export type UserRole = 'Adopter' | 'Volunteer' | 'Shelter_Admin' | 'Developer';

type User = {
  apiKey: string | null;
  createdAt: Date;
  email: string;
  externalId: string | null;
  id: string;
  role: string;
};

export interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  gender: Gender;
  description: string;
  address: string;
  adoptionStatus: AdoptionStatus;
  healthCondition: HealthCondition;
  imageUrl: string | null;
  createdAt: Date;
  location?: {
    id: string;
    latitude: number;
    longitude: number;
    reportId: string | null;
  } | null; // Allow null and include the full location object
  addedBy: User;
}
