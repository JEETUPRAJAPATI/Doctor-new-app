import { Doctor } from '@/types/medical';

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'General',
    hospital: 'City General Hospital',
    experience: '15 years',
    rating: 4.8,
    availability: true,
    image: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
    consultationFee: 1500,
    education: 'MD - General Medicine, MBBS',
    languages: ['English', 'Spanish'],
    about: 'Experienced general physician specializing in preventive care and family medicine.',
    reviews: [
      { id: 1, rating: 5, comment: 'Very thorough and caring', user: 'John D.' },
      { id: 2, rating: 4, comment: 'Great experience', user: 'Sarah M.' }
    ]
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'General',
    hospital: 'Metro Medical Center',
    experience: '12 years',
    rating: 4.6,
    availability: true,
    image: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
    consultationFee: 1800,
    education: 'MD - Internal Medicine, MBBS',
    languages: ['English', 'Mandarin'],
    about: 'Specialized in internal medicine with focus on chronic disease management.',
    reviews: [
      { id: 1, rating: 5, comment: 'Very knowledgeable', user: 'Mike R.' },
      { id: 2, rating: 4, comment: 'Professional service', user: 'Lisa K.' }
    ]
  },
  {
    id: 3,
    name: 'Dr. Emily White',
    specialty: 'Dentist',
    hospital: 'Smile Dental Clinic',
    experience: '8 years',
    rating: 4.9,
    availability: true,
    image: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
    consultationFee: 2000,
    education: 'DDS - Dental Surgery',
    languages: ['English'],
    about: 'Specialized in cosmetic dentistry and oral health care.',
    reviews: [
      { id: 1, rating: 5, comment: 'Gentle and professional', user: 'Tom H.' },
      { id: 2, rating: 5, comment: 'Best dentist ever', user: 'Mary P.' }
    ]
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Pediatric',
    hospital: 'Children\'s Medical Center',
    experience: '20 years',
    rating: 4.9,
    availability: true,
    image: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
    consultationFee: 2500,
    education: 'MD - Pediatrics, MBBS',
    languages: ['English', 'French'],
    about: 'Experienced pediatrician specializing in child development and care.',
    reviews: [
      { id: 1, rating: 5, comment: 'Amazing with kids', user: 'Jane F.' },
      { id: 2, rating: 5, comment: 'Very patient and caring', user: 'Robert M.' }
    ]
  },
  {
    id: 5,
    name: 'Dr. Maria Rodriguez',
    specialty: 'Cardiology',
    hospital: 'Heart Care Institute',
    experience: '18 years',
    rating: 4.7,
    availability: true,
    image: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
    consultationFee: 3000,
    education: 'MD - Cardiology, DM, MBBS',
    languages: ['English', 'Spanish'],
    about: 'Specialized in cardiovascular diseases and preventive cardiology.',
    reviews: [
      { id: 1, rating: 5, comment: 'Excellent cardiologist', user: 'David L.' },
      { id: 2, rating: 4, comment: 'Very thorough', user: 'Patricia S.' }
    ]
  }
];