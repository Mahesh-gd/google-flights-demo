// services/flight.service.ts
import type { FlightSearchResponse } from '../types/flight.types';
import type { SearchFormData, FilterOptions } from '../types/flight.types';
import { API_CONFIG, MOCK_FLIGHT_DATA } from '../constants/flight.constants';

interface SearchFlightParams {
  formData: SearchFormData;
  filters?: FilterOptions;
}

export class FlightService {
  static async searchFlights({ formData, filters }: SearchFlightParams): Promise<{
    data: FlightSearchResponse['data']['itineraries'];
    isUsingMockData: boolean;
    error?: string;
    totalResults?: number;
  }> {
    try {
      const params = new URLSearchParams({
        originSkyId: formData.origin,
        destinationSkyId: formData.destination,
        originEntityId: '95565054', // Bengaluru entity ID
        destinationEntityId: '27537542', // New York entity ID  
        date: formData.departDate,
        returnDate: formData.tripType === 'round-trip' ? formData.returnDate : '',
        cabinClass: formData.travelClass,
        adults: formData.passengers,
        sortBy: formData.sortBy,
        currency: 'INR',
        market: 'en-IN',
        countryCode: 'IN'
      });

      const response = await fetch(`${API_CONFIG.BASE_URL}?${params}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_CONFIG.KEY,
          'X-RapidAPI-Host': API_CONFIG.HOST
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FlightSearchResponse = await response.json();
      
      if (data.status && data.data.itineraries && data.data.itineraries.length > 0) {
        let filteredData = data.data.itineraries;
        
        // Apply filters if provided
        if (filters) {
          filteredData = this.applyFilters(filteredData, filters);
        }
        
        return {
          data: filteredData,
          isUsingMockData: false,
          totalResults: filteredData.length
        };
      } else {
        throw new Error('No flights found in API response');
      }
    } catch (error) {
      console.error('Flight search error:', error);
      console.log('Falling back to mock data...');
      
      let filteredData = MOCK_FLIGHT_DATA;
      
      // Apply filters to mock data if provided
      if (filters) {
        filteredData = this.applyFilters(MOCK_FLIGHT_DATA, filters);
      }
      
      // Apply sorting
      filteredData = this.sortFlights(filteredData, formData.sortBy);
      
      return {
        data: filteredData,
        isUsingMockData: true,
        error: '',
        totalResults: filteredData.length
      };
    }
  }

  static applyFilters(flights: any[], filters: FilterOptions): any[] {
    return flights.filter(flight => {
      // Stop count filter
      if (filters.stops && filters.stops !== 'any') {
        const maxStops = flight.legs[0].stopCount;
        switch (filters.stops) {
          case 'nonstop':
            if (maxStops !== 0) return false;
            break;
          case '1stop':
            if (maxStops > 1) return false;
            break;
          case '2stops':
            if (maxStops > 2) return false;
            break;
        }
      }

      // Price range filter
      if (filters.priceRange) {
        const price = flight.price.raw;
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }

      // Airlines filter
      if (filters.airlines && filters.airlines.length > 0 && !filters.airlines.includes('all')) {
        const flightAirline = flight.legs[0].carriers.marketing[0].name.toLowerCase();
        const hasMatchingAirline = filters.airlines.some(airline => 
          flightAirline.includes(airline.toLowerCase())
        );
        if (!hasMatchingAirline) return false;
      }

      // Duration filter (if provided)
      if (filters.maxDuration) {
        if (flight.legs[0].durationInMinutes > filters.maxDuration) {
          return false;
        }
      }

      return true;
    });
  }

  static sortFlights(flights: any[], sortBy: string): any[] {
    const sortedFlights = [...flights];
    
    switch (sortBy) {
      case 'cheapest':
        return sortedFlights.sort((a, b) => a.price.raw - b.price.raw);
      case 'fastest':
        return sortedFlights.sort((a, b) => a.legs[0].durationInMinutes - b.legs[0].durationInMinutes);
      case 'best':
      default:
        // Best is typically a combination of price and convenience
        return sortedFlights.sort((a, b) => {
          const scoreA = this.calculateBestScore(a);
          const scoreB = this.calculateBestScore(b);
          return scoreA - scoreB;
        });
    }
  }

  static calculateBestScore(flight: any): number {
    // Simple scoring algorithm: lower is better
    const priceScore = flight.price.raw / 1000; // Normalize price
    const durationScore = flight.legs[0].durationInMinutes / 60; // Normalize duration
    const stopsPenalty = flight.legs[0].stopCount * 2; // Penalty for stops
    
    return priceScore + durationScore + stopsPenalty;
  }

  static async getFlightDetails(flightId: string): Promise<any> {
    // Mock implementation for flight details
    const flight = MOCK_FLIGHT_DATA.find(f => f.id === flightId);
    return Promise.resolve(flight);
  }

  static formatPrice(amount: number, currency: string = 'INR'): string {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString()}`;
  }

  static formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hr ${mins} min`;
  }

  static getStopDescription(stopCount: number): string {
    if (stopCount === 0) return 'Nonstop';
    if (stopCount === 1) return '1 stop';
    return `${stopCount} stops`;
  }
}