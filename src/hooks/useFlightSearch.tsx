// hooks/useFlightSearch.ts
import { useState, useEffect, useCallback } from 'react';
import type { Itinerary } from '../types/flight.types';
import type { SearchFormData } from '../types/flight.types';
import { FlightService } from '../services/flight.service';

interface UseFlightSearchReturn {
  flights: Itinerary[];
  loading: boolean;
  error: string | null;
  usingMockData: boolean;
  searchFlights: () => Promise<void>;
}

export const useFlightSearch = (formData: SearchFormData): UseFlightSearchReturn => {
  const [flights, setFlights] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const searchFlights = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    try {
      const result = await FlightService.searchFlights({ formData });
      
      setFlights(result.data);
      setUsingMockData(result.isUsingMockData);
      
      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Search flights error:', err);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  useEffect(() => {
    // Load initial flights on mount
    searchFlights();
  }, []); // Empty dependency array for initial load only

  return {
    flights,
    loading,
    error,
    usingMockData,
    searchFlights
  };
};