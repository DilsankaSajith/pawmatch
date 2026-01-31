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
