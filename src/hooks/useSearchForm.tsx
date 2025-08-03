// hooks/useSearchForm.ts
import { useState, useCallback } from 'react';
import type { SearchFormData } from '../types/flight.types';

interface UseSearchFormReturn {
  formData: SearchFormData;
  updateFormData: (field: keyof SearchFormData, value: string) => void;
  swapDestinations: () => void;
}

const initialFormData: SearchFormData = {
  tripType: 'round-trip',
  passengers: '1',
  travelClass: 'economy',
  origin: 'BLR',
  destination: 'JFK',
  departDate: '2024-08-09',
  returnDate: '2024-08-16',
  sortBy: 'best'
};

export const useSearchForm = (): UseSearchFormReturn => {
  const [formData, setFormData] = useState<SearchFormData>(initialFormData);

  const updateFormData = useCallback((field: keyof SearchFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const swapDestinations = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  }, []);

  return {
    formData,
    updateFormData,
    swapDestinations
  };
};