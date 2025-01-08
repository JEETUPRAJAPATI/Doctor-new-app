export const labTestCategories = [
  {
    id: 1,
    title: 'DIABETES',
    icon: '💉',
    color: '#4ade80',
  },
  {
    id: 2,
    title: 'CANCER',
    icon: '🎗️',
    color: '#60a5fa',
  },
  {
    id: 3,
    title: 'KIDNEY',
    icon: '🫘',
    color: '#f87171',
  },
  {
    id: 4,
    title: 'BLOOD',
    icon: '🩸',
    color: '#34d391',
  },
];

export const labTests = {
  'DIABETES': [
    {
      id: 1,
      name: 'Blood Sugar Test (HbA1c)',
      description: 'Measures average blood sugar levels',
      price: 599,
      duration: '24 hours',
      requirements: 'Fasting for 8 hours',
      image: 'https://img.freepik.com/free-vector/blood-test-concept-illustration_114360-3029.jpg',
    },
    {
      id: 2,
      name: 'Glucose Tolerance Test',
      description: 'Diagnoses diabetes or prediabetes',
      price: 799,
      duration: '3 hours',
      requirements: 'Fasting for 12 hours',
      image: 'https://img.freepik.com/free-vector/diabetes-test-concept-illustration_114360-3032.jpg',
    }
  ],
  'CANCER': [
    {
      id: 3,
      name: 'Tumor Marker Test',
      description: 'Cancer screening test',
      price: 1499,
      duration: '48 hours',
      requirements: 'No special preparation',
      image: 'https://img.freepik.com/free-vector/cancer-test-concept-illustration_114360-3033.jpg',
    }
  ],
  'KIDNEY': [
    {
      id: 4,
      name: 'Kidney Function Test',
      description: 'Evaluates kidney function',
      price: 899,
      duration: '24 hours',
      requirements: 'Fasting for 8 hours',
      image: 'https://img.freepik.com/free-vector/kidney-test-concept-illustration_114360-3034.jpg',
    }
  ],
  'BLOOD': [
    {
      id: 5,
      name: 'Complete Blood Count',
      description: 'Basic blood test panel',
      price: 599,
      duration: '24 hours',
      requirements: 'Fasting for 8 hours',
      image: 'https://img.freepik.com/free-vector/blood-test-concept-illustration_114360-3029.jpg',
    }
  ]
};