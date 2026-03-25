export type AnimalType = "Dog" | "Cat" | "Other";

export type AdoptionReadiness =
  | "Available"
  | "Needs Medical Care"
  | "Reserved";

export type Gender = "Male" | "Female";
export type Size = "Small" | "Medium" | "Large";

export interface MockPet {
  id: string;
  name: string;
  age: number; // in months
  breed: string;
  type: AnimalType;
  gender: Gender;
  size: Size;
  description: string;
  location: {
    label: string; // human-readable e.g. "Colombo 03"
    latitude: number;
    longitude: number;
  };
  adoptionReadiness: AdoptionReadiness;
  addedBy: string; // clerk user ID (UUID)
  imageUrl: string;
  vaccinated: boolean;
  neutered: boolean;
  addedAt: string; // ISO date string
}

export const mockPets: MockPet[] = [
  {
    id: "pet-001",
    name: "Buddy",
    age: 8,
    breed: "Labrador Mix",
    type: "Dog",
    gender: "Male",
    size: "Medium",
    description:
      "Buddy is a playful and friendly dog found near Viharamahadevi Park. He gets along well with children and other animals. Fully vaccinated and ready for a forever home.",
    location: {
      label: "Colombo 07",
      latitude: 6.9055,
      longitude: 79.8633,
    },
    adoptionReadiness: "Available",
    addedBy: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    imageUrl: "/hero-dog.png",
    vaccinated: true,
    neutered: true,
    addedAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "pet-002",
    name: "Luna",
    age: 5,
    breed: "Domestic Shorthair",
    type: "Cat",
    gender: "Female",
    size: "Small",
    description:
      "Luna is a calm and affectionate cat rescued from a Nugegoda neighbourhood. She loves quiet environments and is great with adults. Currently being treated for a minor respiratory issue.",
    location: {
      label: "Nugegoda",
      latitude: 6.8728,
      longitude: 79.8861,
    },
    adoptionReadiness: "Reserved",
    addedBy: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    imageUrl: "/hero-cat.png",
    vaccinated: true,
    neutered: true,
    addedAt: "2024-03-05T14:30:00Z",
  },
  {
    id: "pet-003",
    name: "Max",
    age: 18,
    breed: "German Shepherd Mix",
    type: "Dog",
    gender: "Male",
    size: "Large",
    description:
      "Max was found wandering near Kandy Lake. He is gentle, loyal, and well-behaved. He responded well to basic commands very quickly. Would thrive with an active family.",
    location: {
      label: "Kandy",
      latitude: 7.2906,
      longitude: 80.6337,
    },
    adoptionReadiness: "Available",
    addedBy: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    imageUrl: "/hero-rescue.png",
    vaccinated: true,
    neutered: true,
    addedAt: "2024-02-20T09:15:00Z",
  },
  {
    id: "pet-004",
    name: "Mochi",
    age: 3,
    breed: "Tabby",
    type: "Cat",
    gender: "Female",
    size: "Small",
    description:
      "Mochi is a tiny kitten found behind a restaurant in Galle Fort. She needs a few more weeks of care before she is ready for adoption. Very curious and loves to play.",
    location: {
      label: "Galle",
      latitude: 6.0535,
      longitude: 80.2209,
    },
    adoptionReadiness: "Needs Medical Care",
    addedBy: "d4e5f6a7-b8c9-0123-defa-234567890123",
    imageUrl: "/hero-cat.png",
    vaccinated: false,
    neutered: false,
    addedAt: "2024-03-10T11:45:00Z",
  },
  {
    id: "pet-005",
    name: "Rocky",
    age: 24,
    breed: "Rottweiler Mix",
    type: "Dog",
    gender: "Male",
    size: "Large",
    description:
      "Rocky is a strong and confident dog from Negombo. He needs an experienced owner with a larger space. Currently undergoing behavioural assessments.",
    location: {
      label: "Negombo",
      latitude: 7.2135,
      longitude: 79.8383,
    },
    adoptionReadiness: "Reserved",
    addedBy: "e5f6a7b8-c9d0-1234-efab-345678901234",
    imageUrl: "/hero-dog.png",
    vaccinated: true,
    neutered: true,
    addedAt: "2024-03-02T16:20:00Z",
  },
  {
    id: "pet-006",
    name: "Cleo",
    age: 12,
    breed: "Persian Mix",
    type: "Cat",
    gender: "Female",
    size: "Medium",
    description:
      "Cleo is a graceful, independent cat found in Matara. She prefers a calm household without young children. She is spayed and fully vaccinated.",
    location: {
      label: "Matara",
      latitude: 5.9549,
      longitude: 80.5549,
    },
    adoptionReadiness: "Available",
    addedBy: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    imageUrl: "/hero-cat.png",
    vaccinated: true,
    neutered: true,
    addedAt: "2024-03-08T08:10:00Z",
  },
  {
    id: "pet-007",
    name: "Bella",
    age: 15,
    breed: "Golden Retriever",
    type: "Dog",
    gender: "Female",
    size: "Large",
    description: "Bella is a friendly Golden Retriever looking for a family to play fetch with.",
    location: {
      label: "Colombo 03",
      latitude: 6.9147,
      longitude: 79.8510,
    },
    adoptionReadiness: "Available",
    addedBy: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    imageUrl: "/hero-dog.png",
    vaccinated: true,
    neutered: true,
    addedAt: "2024-03-12T12:00:00Z",
  },
  {
    id: "pet-008",
    name: "Coco",
    age: 2,
    breed: "Siamese",
    type: "Cat",
    gender: "Male",
    size: "Small",
    description: "Coco is a talkative Siamese kitten who loves attention.",
    location: {
      label: "Mount Lavinia",
      latitude: 6.8324,
      longitude: 79.8631,
    },
    adoptionReadiness: "Available",
    addedBy: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    imageUrl: "/hero-cat.png",
    vaccinated: false,
    neutered: false,
    addedAt: "2024-03-15T15:00:00Z",
  },
];
