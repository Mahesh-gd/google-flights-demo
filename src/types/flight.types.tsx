// types/flight.types.ts
export interface Airport {
  id: string;
  name: string;
  displayCode: string;
  city: string;
  isHighlighted?: boolean;
}

export interface Carrier {
  id: number;
  logoUrl: string;
  name: string;
  operationType: string;
}

export interface Leg {
  id: string;
  origin: Airport;
  stops: string;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  departure: string;
  arrival: string;
  carriers: {
    marketing: Carrier[];
  };
}

export interface Itinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: Leg[];
}

export interface FilterOptions {
  stops?: string;
  airlines?: string[];
  priceRange?: { min: number; max: number };
  maxDuration?: number;
}


export interface FlightSearchResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: string;
      totalResults: number;
    };
    itineraries: Itinerary[];
  };
}

export interface SearchFormData {
  tripType: string;
  passengers: string;
  travelClass: string;
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  sortBy: string;
}