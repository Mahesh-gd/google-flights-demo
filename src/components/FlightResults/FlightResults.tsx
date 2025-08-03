// components/FlightResults/FlightResults.tsx
import React from 'react';
import { Filter, Loader2, Plane } from 'lucide-react';
import type { Itinerary } from '../../types/flight.types';
import { SORT_OPTIONS } from '../../constants/flight.constants';
import FlightCard from '../FlightCard/FlightCard';

interface FlightResultsProps {
  flights: Itinerary[];
  loading: boolean;
  error: string | null;
  usingMockData: boolean;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({
  flights,
  loading,
  error,
  usingMockData,
  sortBy,
  onSortChange
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Searching for flights...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border rounded-lg p-4 mb-6 ${
        usingMockData ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'
      }`}>
        <p className={usingMockData ? 'text-blue-800' : 'text-red-800'}>{error}</p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
        <p className="text-gray-600">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <>
      {/* Sort and Filter Options */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            All filters
          </button>
        </div>
        
        <p className="text-gray-600">
          {flights.length} flights found {usingMockData && '(Sample Data)'}
        </p>
      </div>

      {/* Flight Results */}
      <div className="space-y-0">
        {flights.map((itinerary) => (
          <FlightCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </>
  );
};

export default FlightResults;