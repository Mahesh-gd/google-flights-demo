

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ArrowLeftRight, Loader2, Filter, ChevronDown, ChevronUp, Info, Plane, Clock, Leaf, SlidersHorizontal, X } from 'lucide-react';

// Types
interface SearchFormData {
  tripType: string;
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: string;
  travelClass: string;
  sortBy: string;
}

interface FilterOptions {
  stops: string;
  airlines: string[];
  priceRange: { min: number; max: number };
  maxDuration: number;
  departureTimeRange: { min: number; max: number };
  arrivalTimeRange: { min: number; max: number };
}

interface Airport {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

interface Leg {
  id: string;
  origin: Airport;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  departure: string;
  arrival: string;
  carriers: {
    marketing: Array<{
      id: number;
      logoUrl: string;
      name: string;
      operationType: string;
    }>;
  };
  stops?: string[];
  emissions: {
    amount: number;
    unit: string;
    change: number;
  };
}

interface Itinerary {
  id: string;
  price: { raw: number; formatted: string };
  legs: Leg[];
  roundTrip: boolean;
  totalDuration: number;
  emissions: {
    amount: number;
    unit: string;
    change: number;
  };
}

// Mock cities data for autocomplete
const CITIES = [
  { id: 'BLR', name: 'Bengaluru', displayCode: 'BLR', city: 'Bengaluru', country: 'India' },
  { id: 'BOM', name: 'Mumbai', displayCode: 'BOM', city: 'Mumbai', country: 'India' },
  { id: 'DEL', name: 'New Delhi', displayCode: 'DEL', city: 'New Delhi', country: 'India' },
  { id: 'JFK', name: 'New York JFK', displayCode: 'JFK', city: 'New York', country: 'USA' },
  { id: 'LAX', name: 'Los Angeles', displayCode: 'LAX', city: 'Los Angeles', country: 'USA' },
  { id: 'LHR', name: 'London Heathrow', displayCode: 'LHR', city: 'London', country: 'UK' },
  { id: 'DXB', name: 'Dubai', displayCode: 'DXB', city: 'Dubai', country: 'UAE' },
  { id: 'SIN', name: 'Singapore', displayCode: 'SIN', city: 'Singapore', country: 'Singapore' },
  { id: 'HKG', name: 'Hong Kong', displayCode: 'HKG', city: 'Hong Kong', country: 'Hong Kong' },
  { id: 'NRT', name: 'Tokyo Narita', displayCode: 'NRT', city: 'Tokyo', country: 'Japan' },
  { id: 'SYD', name: 'Sydney', displayCode: 'SYD', city: 'Sydney', country: 'Australia' },
  { id: 'CDG', name: 'Paris Charles de Gaulle', displayCode: 'CDG', city: 'Paris', country: 'France' },
  { id: 'FRA', name: 'Frankfurt', displayCode: 'FRA', city: 'Frankfurt', country: 'Germany' },
  { id: 'BCN', name: 'Barcelona', displayCode: 'BCN', city: 'Barcelona', country: 'Spain' },
  { id: 'IST', name: 'Istanbul', displayCode: 'IST', city: 'Istanbul', country: 'Turkey' },
];

// Mock data
const MOCK_FLIGHT_DATA: Itinerary[] = [
  {
    id: "mock-1",
    price: { raw: 122124, formatted: "₹1,22,124" },
    legs: [{
      id: "mock-leg-1-out",
      origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
      destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
      durationInMinutes: 1564,
      stopCount: 2,
      departure: "2024-08-09T04:55:00",
      arrival: "2024-08-10T09:29:00",
      carriers: {
        marketing: [{
          id: 1,
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/6E.png",
          name: "IndiGo, Virgin Atlantic",
          operationType: "codeshare"
        }]
      },
      stops: ["BOM", "LHR"],
      emissions: { amount: 750, unit: "kg CO₂", change: -15 }
    }],
    roundTrip: true,
    totalDuration: 3128,
    emissions: { amount: 750, unit: "kg CO₂", change: -15 }
  },
  {
    id: "mock-2",
    price: { raw: 135238, formatted: "₹1,35,238" },
    legs: [{
      id: "mock-leg-2-out",
      origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
      destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
      durationInMinutes: 1240,
      stopCount: 1,
      departure: "2024-08-09T04:00:00",
      arrival: "2024-08-09T15:10:00",
      carriers: {
        marketing: [{
          id: 2,
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/QR.png",
          name: "Qatar Airways",
          operationType: "fully_operated"
        }]
      },
      stops: ["DOH"],
      emissions: { amount: 1003, unit: "kg CO₂", change: 13 }
    }],
    roundTrip: true,
    totalDuration: 2620,
    emissions: { amount: 1003, unit: "kg CO₂", change: 13 }
  },
  {
    id: "mock-3",
    price: { raw: 136520, formatted: "₹1,36,520" },
    legs: [{
      id: "mock-leg-3-out",
      origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
      destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
      durationInMinutes: 1220,
      stopCount: 0,
      departure: "2024-08-09T06:45:00",
      arrival: "2024-08-09T17:35:00",
      carriers: {
        marketing: [{
          id: 3,
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/BA.png",
          name: "British Airways",
          operationType: "fully_operated"
        }]
      },
      stops: [],
      emissions: { amount: 825, unit: "kg CO₂", change: -7 }
    }],
    roundTrip: true,
    totalDuration: 2510,
    emissions: { amount: 825, unit: "kg CO₂", change: -7 }
  },
  {
    id: "mock-4",
    price: { raw: 150945, formatted: "₹1,50,945" },
    legs: [{
      id: "mock-leg-4-out",
      origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
      destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
      durationInMinutes: 1320,
      stopCount: 1,
      departure: "2024-08-09T02:10:00",
      arrival: "2024-08-09T15:00:00",
      carriers: {
        marketing: [{
          id: 4,
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/LH.png",
          name: "Lufthansa",
          operationType: "fully_operated"
        }]
      },
      stops: ["MUC"],
      emissions: { amount: 839, unit: "kg CO₂", change: 0 }
    }],
    roundTrip: true,
    totalDuration: 2760,
    emissions: { amount: 839, unit: "kg CO₂", change: 0 }
  },
  {
    id: "mock-5",
    price: { raw: 89999, formatted: "₹89,999" },
    legs: [{
      id: "mock-leg-5-out",
      origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
      destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
      durationInMinutes: 900,
      stopCount: 0,
      departure: "2024-08-09T23:30:00",
      arrival: "2024-08-10T09:30:00",
      carriers: {
        marketing: [{
          id: 5,
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AI.png",
          name: "Air India",
          operationType: "fully_operated"
        }]
      },
      stops: [],
      emissions: { amount: 920, unit: "kg CO₂", change: 5 }
    }],
    roundTrip: true,
    totalDuration: 1800,
    emissions: { amount: 920, unit: "kg CO₂", change: 5 }
  }
];

// Utility functions
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} hr ${mins} min`;
};

const getStopText = (stopCount: number) => {
  if (stopCount === 0) return 'Nonstop';
  return `${stopCount} stop${stopCount > 1 ? 's' : ''}`;
};

const getHourFromTime = (dateString: string) => {
  return new Date(dateString).getHours();
};

// Autocomplete Input Component
const AutocompleteInput = ({ 
  value, 
  onChange, 
  placeholder, 
  className = "" 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  placeholder: string; 
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = useMemo(() => {
    if (!inputValue.trim()) return CITIES.slice(0, 8);
    
    const searchTerm = inputValue.toLowerCase();
    return CITIES.filter(city => 
      city.city.toLowerCase().includes(searchTerm) ||
      city.name.toLowerCase().includes(searchTerm) ||
      city.displayCode.toLowerCase().includes(searchTerm)
    ).slice(0, 8);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
  };

  const handleCitySelect = (city: any) => {
    setInputValue(city.city);
    onChange(city.city);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
      
      {isOpen && filteredCities.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredCities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{city.city}</div>
              <div className="text-sm text-gray-600">{city.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Individual Filter Dropdown Components
const StopsFilter = ({ value, onChange, isOpen, onToggle }: { value: string; onChange: (value: string) => void; isOpen: boolean; onToggle: () => void }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
    >
      <span className="hidden sm:inline">Stops</span>
      <span className="sm:hidden">Stop</span>
      <ChevronDown className="w-4 h-4" />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
        <div className="space-y-2">
          {[
            { value: 'any', label: 'Any number of stops' },
            { value: 'nonstop', label: 'Nonstop only' },
            { value: '1stop', label: '1 stop or fewer' },
            { value: '2stops', label: '2 stops or fewer' }
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="stops"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    )}
  </div>
);

const AirlinesFilter = ({ value, onChange, isOpen, onToggle }: { value: string[]; onChange: (value: string[]) => void; isOpen: boolean; onToggle: () => void }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
    >
      <span>Airlines</span>
      {value.length > 0 && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{value.length}</span>}
      <ChevronDown className="w-4 h-4" />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
        <div className="space-y-2">
          {['IndiGo', 'Air India', 'Qatar Airways', 'British Airways', 'Lufthansa', 'Virgin Atlantic'].map((airline) => (
            <label key={airline} className="flex items-center">
              <input
                type="checkbox"
                checked={value.includes(airline)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...value, airline]);
                  } else {
                    onChange(value.filter(a => a !== airline));
                  }
                }}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm">{airline}</span>
            </label>
          ))}
        </div>
      </div>
    )}
  </div>
);

const PriceFilter = ({ value, onChange, isOpen, onToggle }: { value: { min: number; max: number }; onChange: (value: { min: number; max: number }) => void; isOpen: boolean; onToggle: () => void }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
    >
      <span>Price</span>
      <ChevronDown className="w-4 h-4" />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[250px]">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Price Range</label>
            <input
              type="range"
              min="50000"
              max="200000"
              step="5000"
              value={value.max}
              onChange={(e) => onChange({ ...value, max: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>₹50,000</span>
              <span>₹{(value.max / 1000).toFixed(0)}k</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

const TimesFilter = ({ departureRange, arrivalRange, onDepartureChange, onArrivalChange, isOpen, onToggle }: { 
  departureRange: { min: number; max: number }; 
  arrivalRange: { min: number; max: number }; 
  onDepartureChange: (value: { min: number; max: number }) => void;
  onArrivalChange: (value: { min: number; max: number }) => void;
  isOpen: boolean; 
  onToggle: () => void 
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
    >
      <span>Times</span>
      <ChevronDown className="w-4 h-4" />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[250px]">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Departure time</label>
            <input
              type="range"
              min="0"
              max="23"
              value={departureRange.max}
              onChange={(e) => onDepartureChange({ ...departureRange, max: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>00:00</span>
              <span>{departureRange.max.toString().padStart(2, '0')}:00</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Arrival time</label>
            <input
              type="range"
              min="0"
              max="23"
              value={arrivalRange.max}
              onChange={(e) => onArrivalChange({ ...arrivalRange, max: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>00:00</span>
              <span>{arrivalRange.max.toString().padStart(2, '0')}:00</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Main Filter Panel Component
const FilterPanel = ({ isOpen, filters, onFiltersChange }: { 
  isOpen: boolean; 
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm mx-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stops Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Stops</h3>
          <div className="space-y-2">
            {[
              { value: 'any', label: 'Any number of stops' },
              { value: 'nonstop', label: 'Nonstop only' },
              { value: '1stop', label: '1 stop or fewer' },
              { value: '2stops', label: '2 stops or fewer' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="stops"
                  value={option.value}
                  checked={filters.stops === option.value}
                  onChange={(e) => onFiltersChange({ ...filters, stops: e.target.value })}
                  className="mr-2 text-blue-600"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Airlines Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Airlines</h3>
          <div className="space-y-2">
            {['IndiGo', 'Air India', 'Qatar Airways', 'British Airways', 'Lufthansa', 'Virgin Atlantic'].map((airline) => (
              <label key={airline} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onFiltersChange({ ...filters, airlines: [...filters.airlines, airline] });
                    } else {
                      onFiltersChange({ ...filters, airlines: filters.airlines.filter(a => a !== airline) });
                    }
                  }}
                  className="mr-2 text-blue-600"
                />
                <span className="text-sm">{airline}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Price</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="50000"
              max="200000"
              step="5000"
              value={filters.priceRange.max}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                priceRange: { ...filters.priceRange, max: parseInt(e.target.value) }
              })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>₹50,000</span>
              <span>₹{(filters.priceRange.max / 1000).toFixed(0)}k</span>
            </div>
          </div>
        </div>

        {/* Times */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Times</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Departure</label>
              <input
                type="range"
                min="0"
                max="23"
                value={filters.departureTimeRange.max}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  departureTimeRange: { ...filters.departureTimeRange, max: parseInt(e.target.value) }
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>00:00</span>
                <span>{filters.departureTimeRange.max.toString().padStart(2, '0')}:00</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Arrival</label>
              <input
                type="range"
                min="0"
                max="23"
                value={filters.arrivalTimeRange.max}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  arrivalTimeRange: { ...filters.arrivalTimeRange, max: parseInt(e.target.value) }
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>00:00</span>
                <span>{filters.arrivalTimeRange.max.toString().padStart(2, '0')}:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Flight Card Component
const FlightCard = ({ flight }: { flight: Itinerary }) => {
  const [expanded, setExpanded] = useState(false);
  const leg = flight.legs[0];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left section - Airline info */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <img 
            src={leg.carriers.marketing[0].logoUrl} 
            alt={leg.carriers.marketing[0].name}
            className="w-8 h-8 rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div>
            <div className="font-medium text-sm">{leg.carriers.marketing[0].name}</div>
          </div>
        </div>

        {/* Flight times and duration */}
        <div className="flex items-center justify-center lg:justify-start space-x-4 lg:space-x-6 flex-1">
          <div className="text-center">
            <div className="text-lg font-semibold">{formatTime(leg.departure)}</div>
            <div className="text-sm text-gray-600">{leg.origin.displayCode}</div>
          </div>
          
          <div className="flex flex-col items-center min-w-0">
            <div className="text-sm text-gray-600 whitespace-nowrap">{formatDuration(leg.durationInMinutes)}</div>
            <div className="flex items-center my-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-8 sm:w-16 h-px bg-gray-300 mx-1"></div>
              <Plane className="w-4 h-4 text-gray-400" />
              <div className="w-8 sm:w-16 h-px bg-gray-300 mx-1"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">{getStopText(leg.stopCount)}</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold">{formatTime(leg.arrival)}</div>
            <div className="text-sm text-gray-600">{leg.destination.displayCode}</div>
          </div>
        </div>

        {/* Mobile layout for emissions and price */}
        <div className="flex items-center justify-between lg:justify-end lg:space-x-6">
          {/* Emissions */}
          <div className="flex items-center space-x-2">
            <Leaf className={`w-4 h-4 ${leg.emissions.change < 0 ? 'text-green-600' : 'text-gray-400'}`} />
            <div className="text-sm">
              <div className="hidden sm:inline">{leg.emissions.amount} {leg.emissions.unit}</div>
              <div className="sm:hidden text-xs">{leg.emissions.amount}kg</div>
              {leg.emissions.change !== 0 && (
                <div className={`text-xs ${leg.emissions.change < 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {leg.emissions.change > 0 ? '+' : ''}{leg.emissions.change}%
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-xl lg:text-2xl font-bold">{flight.price.formatted}</div>
            <div className="text-sm text-gray-600">round trip</div>
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Stops:</strong> {leg.stops && leg.stops.length > 0 ? leg.stops.join(', ') : 'Direct flight'}</p>
            <p><strong>Duration:</strong> {formatDuration(leg.durationInMinutes)}</p>
            <p><strong>Aircraft:</strong> {leg.carriers.marketing[0].operationType}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Sort tabs component
const SortTabs = ({ activeSort, onSortChange }: { activeSort: string; onSortChange: (sort: string) => void }) => {
  const sortOptions = [
    { value: 'best', label: 'Best', info: 'Ranked based on price and convenience' },
    { value: 'cheapest', label: 'Cheapest', info: 'from ₹89,999' },
  ];

  return (
    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`px-4 lg:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeSort === option.value
              ? 'border-blue-600 text-blue-600 bg-blue-50'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center space-x-1">
            <span>{option.label}</span>
            <Info className="w-3 h-3" />
          </div>
          {option.info && (
            <div className="text-xs text-gray-500 mt-1 hidden sm:block">{option.info}</div>
          )}
        </button>
      ))}
    </div>
  );
};

// Main Component
const FlightSearchApp = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    tripType: 'round-trip',
    origin: 'Bengaluru',
    destination: 'New York',
    departDate: '2024-08-09',
    returnDate: '2024-08-16',
    passengers: '1',
    travelClass: 'economy',
    sortBy: 'best'
  });

  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<Itinerary[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeSort, setActiveSort] = useState('best');
  
  // Individual filter dropdowns state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    stops: 'any',
    airlines: [],
    priceRange: { min: 50000, max: 200000 },
    maxDuration: 1440,
    departureTimeRange: { min: 0, max: 23 },
    arrivalTimeRange: { min: 0, max: 23 }
  });

  const handleFormDataChange = (field: keyof SearchFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSwapDestinations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFlights(MOCK_FLIGHT_DATA);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter flights based on current filter settings
  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      const leg = flight.legs[0];
      
      // Price filter
      if (flight.price.raw > filters.priceRange.max) return false;
      
      // Stops filter
      if (filters.stops === 'nonstop' && leg.stopCount > 0) return false;
      if (filters.stops === '1stop' && leg.stopCount > 1) return false;
      if (filters.stops === '2stops' && leg.stopCount > 2) return false;
      
      // Airlines filter
      if (filters.airlines.length > 0 && !filters.airlines.some(airline => 
        leg.carriers.marketing[0].name.includes(airline)
      )) return false;
      
      // Departure time filter
      const departureHour = getHourFromTime(leg.departure);
      if (departureHour > filters.departureTimeRange.max) return false;
      
      // Arrival time filter
      const arrivalHour = getHourFromTime(leg.arrival);
      if (arrivalHour > filters.arrivalTimeRange.max) return false;
      
      return true;
    });
  }, [flights, filters]);

  const sortedFlights = useMemo(() => {
    return [...filteredFlights].sort((a, b) => {
      switch (activeSort) {
        case 'cheapest':
          return a.price.raw - b.price.raw;
        case 'best':
        default:
          return a.price.raw - b.price.raw; // Simple implementation
      }
    });
  }, [filteredFlights, activeSort]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextTwoWeeks = new Date(today);
    nextTwoWeeks.setDate(today.getDate() + 14);

    if (!formData.departDate) {
      setFormData(prev => ({
        ...prev,
        departDate: nextWeek.toISOString().split('T')[0],
        returnDate: nextTwoWeeks.toISOString().split('T')[0]
      }));
    }
  }, []);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Search form - condensed */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-4">
              <select 
                value={formData.tripType}
                onChange={(e) => handleFormDataChange('tripType', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="round-trip">Round trip</option>
                <option value="one-way">One way</option>
              </select>
              
              <select 
                value={formData.passengers}
                onChange={(e) => handleFormDataChange('passengers', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              
              <select 
                value={formData.travelClass}
                onChange={(e) => handleFormDataChange('travelClass', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>

            {/* Route and dates */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <AutocompleteInput
                    value={formData.origin}
                    onChange={(value) => handleFormDataChange('origin', value)}
                    placeholder="Where from?"
                    className="text-lg font-medium bg-transparent border-none"
                  />
                </div>
                <ArrowLeftRight 
                  className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0"
                  onClick={handleSwapDestinations}
                />
                <div className="flex-1 min-w-0">
                  <AutocompleteInput
                    value={formData.destination}
                    onChange={(value) => handleFormDataChange('destination', value)}
                    placeholder="Where to?"
                    className="text-lg font-medium bg-transparent border-none"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 lg:gap-4">
                <input
                  type="date"
                  value={formData.departDate}
                  onChange={(e) => handleFormDataChange('departDate', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 flex-1"
                />
                
                {formData.tripType === 'round-trip' && (
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleFormDataChange('returnDate', e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 flex-1"
                  />
                )}
                
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 whitespace-nowrap"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">All filters</span>
                <span className="sm:hidden">Filters</span>
              </button>
              
              <div onClick={(e) => e.stopPropagation()}>
                <StopsFilter
                  value={filters.stops}
                  onChange={(value) => setFilters({ ...filters, stops: value })}
                  isOpen={openDropdown === 'stops'}
                  onToggle={() => toggleDropdown('stops')}
                />
              </div>
              
              <div onClick={(e) => e.stopPropagation()}>
                <AirlinesFilter
                  value={filters.airlines}
                  onChange={(value) => setFilters({ ...filters, airlines: value })}
                  isOpen={openDropdown === 'airlines'}
                  onToggle={() => toggleDropdown('airlines')}
                />
              </div>
              
              <div onClick={(e) => e.stopPropagation()}>
                <PriceFilter
                  value={filters.priceRange}
                  onChange={(value) => setFilters({ ...filters, priceRange: value })}
                  isOpen={openDropdown === 'price'}
                  onToggle={() => toggleDropdown('price')}
                />
              </div>
              
              <div onClick={(e) => e.stopPropagation()}>
                <TimesFilter
                  departureRange={filters.departureTimeRange}
                  arrivalRange={filters.arrivalTimeRange}
                  onDepartureChange={(value) => setFilters({ ...filters, departureTimeRange: value })}
                  onArrivalChange={(value) => setFilters({ ...filters, arrivalTimeRange: value })}
                  isOpen={openDropdown === 'times'}
                  onToggle={() => toggleDropdown('times')}
                />
              </div>
              
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap text-sm">
                <span className="hidden sm:inline">Emissions</span>
                <span className="sm:hidden">CO₂</span>
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter panel */}
        <FilterPanel 
          isOpen={showFilters} 
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Sort tabs */}
          <SortTabs activeSort={activeSort} onSortChange={setActiveSort} />

          {/* Flight list header */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Top departing flights 
              {filteredFlights.length !== flights.length && (
                <span className="text-gray-600 font-normal">
                  ({filteredFlights.length} of {flights.length} flights)
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-600">
              Ranked based on price and convenience. <span className="font-medium">Prices include required taxes + fees for 1 adult.</span> 
              <span className="hidden sm:inline"> Optional charges and bag fees may apply. Passenger assistance info.</span>
            </p>
          </div>

          {/* Active filters display */}
          {(filters.stops !== 'any' || filters.airlines.length > 0 || filters.priceRange.max < 200000 || 
            filters.departureTimeRange.max < 23 || filters.arrivalTimeRange.max < 23) && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filters.stops !== 'any' && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {filters.stops}
                </span>
              )}
              {filters.airlines.length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {filters.airlines.length} airline{filters.airlines.length > 1 ? 's' : ''}
                </span>
              )}
              {filters.priceRange.max < 200000 && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Under ₹{(filters.priceRange.max / 1000).toFixed(0)}k
                </span>
              )}
              {filters.departureTimeRange.max < 23 && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Depart before {filters.departureTimeRange.max.toString().padStart(2, '0')}:00
                </span>
              )}
              {filters.arrivalTimeRange.max < 23 && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Arrive before {filters.arrivalTimeRange.max.toString().padStart(2, '0')}:00
                </span>
              )}
              <button
                onClick={() => setFilters({
                  stops: 'any',
                  airlines: [],
                  priceRange: { min: 50000, max: 200000 },
                  maxDuration: 1440,
                  departureTimeRange: { min: 0, max: 23 },
                  arrivalTimeRange: { min: 0, max: 23 }
                })}
                className="text-blue-600 text-xs hover:text-blue-800"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Flight cards */}
          <div className="space-y-4">
            {sortedFlights.length > 0 ? (
              sortedFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-lg font-medium mb-2">No flights found</div>
                <div className="text-sm">Try adjusting your filters to see more results.</div>
              </div>
            )}
          </div>

          {/* Booking tip */}
          {sortedFlights.length > 0 && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900">
                  The cheapest time to book is usually earlier, up to 5 months before takeoff
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Search form view - Updated with FlightSearchForm design
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-center mb-6 sm:mb-8 text-gray-800">Flights</h1>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Trip Type and Passenger Selection */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-sm">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="trip-type"
                  value="round-trip"
                  checked={formData.tripType === 'round-trip'}
                  onChange={(e) => handleFormDataChange('tripType', e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Round trip</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="trip-type"
                  value="one-way"
                  checked={formData.tripType === 'one-way'}
                  onChange={(e) => handleFormDataChange('tripType', e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">One way</span>
              </label>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <select
                value={formData.passengers}
                onChange={(e) => handleFormDataChange('passengers', e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} passenger{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>

              <select
                value={formData.travelClass}
                onChange={(e) => handleFormDataChange('travelClass', e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
              >
                <option value="economy">Economy</option>
                <option value="premium_economy">Premium economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
          </div>

          {/* Main Search Fields */}
          <div className="space-y-4">
            {/* Mobile: Origin and Destination in single row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 items-end">
              {/* From Airport */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
                <AutocompleteInput
                  value={formData.origin}
                  onChange={(value) => handleFormDataChange('origin', value)}
                  placeholder="Where from?"
                  className="w-full"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center sm:justify-center sm:pb-3 order-last sm:order-none">
                <button
                  type="button"
                  onClick={handleSwapDestinations}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:hidden">
                    <path d="M3 8L7 4l4 4"/>
                    <path d="M7 4v16"/>
                    <path d="M21 16l-4 4-4-4"/>
                    <path d="M17 20V4"/>
                  </svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden sm:block">
                    <path d="M8 3L4 7l4 4"/>
                    <path d="M4 7h16"/>
                    <path d="M16 21l4-4-4-4"/>
                    <path d="M20 17H4"/>
                  </svg>
                </button>
              </div>

              {/* To Airport */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">To</label>
                <AutocompleteInput
                  value={formData.destination}
                  onChange={(value) => handleFormDataChange('destination', value)}
                  placeholder="Where to?"
                  className="w-full"
                />
              </div>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Departure Date */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Departure</label>
                <input
                  type="date"
                  value={formData.departDate}
                  onChange={(e) => handleFormDataChange('departDate', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {formData.tripType === 'round-trip' ? 'Return' : 'Return (optional)'}
                </label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleFormDataChange('returnDate', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={formData.tripType === 'one-way'}
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              <span>{loading ? 'Searching...' : 'Explore'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchApp;