import { Pet } from '@/types';

export const mockPets: Pet[] = [
  {
    id: 'pet-001',
    name: 'Buddy',
    age: '8',
    breed: 'Labrador Mix',
    gender: 'Male',
    description:
      'Buddy is a playful and friendly dog found near Viharamahadevi Park. He gets along well with children and other animals. Fully vaccinated and ready for a forever home.',
    location: {
      latitude: 6.9055,
      longitude: 79.8633,
    },
    address: '123 Park Lane, Colombo 07, Sri Lanka',
    adoptionStatus: 'Ready',
    healthCondition: 'Healthy',
    addedBy: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    imageUrl: '/hero-dog.png',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'pet-002',
    name: 'Luna',
    age: 5,
    breed: 'Domestic Shorthair',
    gender: 'Female',
    description:
      'Luna is a calm and affectionate cat rescued from a Nugegoda neighbourhood. She loves quiet environments and is great with adults. Currently being treated for a minor respiratory issue.',
    location: {
      latitude: 6.8728,
      longitude: 79.8861,
    },
    address: '456 Main Street, Nugegoda, Sri Lanka',
    adoptionStatus: 'Pending',
    healthCondition: 'Recovering',
    addedBy: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    imageUrl: '/hero-cat.png',
    createdAt: '2024-03-05T14:30:00Z',
  },
  {
    id: 'pet-003',
    name: 'Max',
    age: 18,
    breed: 'German Shepherd Mix',
    gender: 'Male',
    description:
      'Max was found wandering near Kandy Lake. He is gentle, loyal, and well-behaved. He responded well to basic commands very quickly. Would thrive with an active family.',
    location: {
      latitude: 7.2906,
      longitude: 80.6337,
    },
    address: '789 Lake View Road, Kandy, Sri Lanka',
    adoptionStatus: 'Adopted',
    healthCondition: 'Critical',
    addedBy: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    imageUrl: '/hero-rescue.png',
    createdAt: '2024-02-20T09:15:00Z',
  },
];
