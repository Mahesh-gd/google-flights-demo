// components/GoogleFlights/GoogleFlights.tsx
import React from 'react';
import Header from '../Header/Header.tsx';
import SearchForm from '../SearchForm/SearchForm.tsx';
import FlightResults from '../FlightResults/FlightResults.tsx';
import { useSearchForm } from '../../hooks/useSearchForm.tsx';
import { useFlightSearch } from '../../hooks/useFlightSearch.tsx';

const GoogleFlights: React.FC = () => {
  const { formData, updateFormData, swapDestinations } = useSearchForm();
  const { flights, loading, error, usingMockData, searchFlights } = useFlightSearch(formData);

  const handleSortChange = (sortBy: string) => {
    updateFormData('sortBy', sortBy);
   
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchForm
          formData={formData}
          loading={loading}
          onFormDataChange={updateFormData}
          onSwapDestinations={swapDestinations}
          onSearch={searchFlights}
        />

        <FlightResults
          flights={flights}
          loading={loading}
          error={error}
          usingMockData={usingMockData}
          sortBy={formData.sortBy}
          onSortChange={handleSortChange}
        />
      </main>
    </div>
  );
};

export default GoogleFlights;