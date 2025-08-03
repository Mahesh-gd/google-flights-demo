// components/FlightCard/FlightCard.tsx
import React, { useState } from 'react';
import { Plane, ChevronDown } from 'lucide-react';
import type { Itinerary } from '../../types/flight.types';
import { formatDuration, formatTime, formatDate } from '../../utils/flight.utils';

interface FlightCardProps {
  itinerary: Itinerary;
}

const FlightCard: React.FC<FlightCardProps> = ({ itinerary }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const leg = itinerary.legs[0];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Airline Logo */}
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            {leg.carriers.marketing[0].logoUrl ? (
              <img 
                src={leg.carriers.marketing[0].logoUrl} 
                alt={leg.carriers.marketing[0].name}
                className="w-6 h-6"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  (target.nextElementSibling as HTMLElement)!.style.display = 'flex';
                }}
              />
            ) : null}
            <Plane className="w-5 h-5 text-gray-600" />
          </div>
          
          {/* Flight Times */}
          <div className="flex items-center space-x-6 flex-1">
            <div className="text-left">
              <div className="text-xl font-semibold text-gray-900">
                {formatTime(leg.departure)}
              </div>
              <div className="text-sm text-gray-600">{leg.origin.displayCode}</div>
            </div>
            
            <div className="flex-1 px-4 min-w-0">
              <div className="text-center mb-1">
                <div className="text-sm text-gray-600">
                  {formatDuration(leg.durationInMinutes)}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-300 flex-1"></div>
                <div className="px-2">
                  {leg.stopCount === 0 ? (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  ) : (
                    <div className="w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{leg.stopCount}</span>
                    </div>
                  )}
                </div>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              <div className="text-center mt-1">
                <span className="text-xs text-gray-600">
                  {leg.stopCount === 0 ? 'Direct' : `${leg.stopCount} stop${leg.stopCount > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-semibold text-gray-900">
                {formatTime(leg.arrival)}
              </div>
              <div className="text-sm text-gray-600">{leg.destination.displayCode}</div>
            </div>
          </div>
        </div>
        
        {/* Price and Details */}
        <div className="text-right ml-6">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {itinerary.price.formatted}
          </div>
          <div className="text-sm text-gray-600 mb-1">round trip</div>
          <div className="text-xs text-gray-500 max-w-32 truncate">
            {leg.carriers.marketing[0].name}
          </div>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-4 p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itinerary.legs.map((flightLeg, index) => (
              <div key={flightLeg.id} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {index === 0 ? 'Outbound' : 'Return'} • {formatDate(flightLeg.departure)}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure:</span>
                    <span className="font-medium">
                      {formatTime(flightLeg.departure)} {flightLeg.origin.displayCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Arrival:</span>
                    <span className="font-medium">
                      {formatTime(flightLeg.arrival)} {flightLeg.destination.displayCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{formatDuration(flightLeg.durationInMinutes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Airline:</span>
                    <span className="font-medium">{flightLeg.carriers.marketing[0].name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;