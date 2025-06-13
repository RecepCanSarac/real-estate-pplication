export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'land' | 'commercial';
  features: {
    bedrooms?: number;
    bathrooms?: number;
    area: number;
    parking?: boolean;
    furnished?: boolean;
  };
  images: string[];
  createdAt: Date;
  userId: string;
  userEmail: string;
} 