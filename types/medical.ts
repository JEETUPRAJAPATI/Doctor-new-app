export interface Category {
  id: number;
  title: string;
  image: string;
  color: string;
  description: string;
}

export interface Subcategory {
  id: number;
  categoryId: number;
  title: string;
  icon: string;
}

export interface LabTest {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  requirements: string;
  availability: boolean;
}

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  specialties: string[];
  rating: number;
  image: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  rating: number;
  availability: boolean;
  image: string;
  consultationFee: number;
}

export interface Appointment {
  id: number;
  doctorId: number;
  patientName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  type: 'consultation' | 'follow-up';
}

export interface Offer {
  id: number;
  title: string;
  image: string;
  color: string;
  description?: string;
  validUntil?: string;
  discount?: number;
}