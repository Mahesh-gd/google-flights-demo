// // constants/flight.constants.ts
// import type { Itinerary } from '../types/flight.types';

// export const API_CONFIG = {
//   // KEY: 'dcb445926amsh78b973ce80d3c11p1f3569jsn1b223ee2f34c',
//   KEY: 'c7a80e99efmsh3ac69df52bd0ff6p14051fjsn7cc986131f06',
//   HOST: 'sky-scrapper.p.rapidapi.com',
//   BASE_URL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights'
// };

// export const TRIP_TYPE_OPTIONS = [
//   { value: 'round-trip', label: 'Round trip' },
//   { value: 'one-way', label: 'One way' }
// ];

// export const PASSENGER_OPTIONS = [
//   { value: '1', label: '1 Passenger' },
//   { value: '2', label: '2 Passengers' },
//   { value: '3', label: '3 Passengers' },
//   { value: '4', label: '4 Passengers' }
// ];

// export const TRAVEL_CLASS_OPTIONS = [
//   { value: 'economy', label: 'Economy' },
//   { value: 'premium_economy', label: 'Premium Economy' },
//   { value: 'business', label: 'Business' },
//   { value: 'first', label: 'First' }
// ];

// export const SORT_OPTIONS = [
//   { value: 'best', label: 'Best' },
//   { value: 'cheapest', label: 'Cheapest' },
//   { value: 'fastest', label: 'Fastest' }
// ];

// export const MOCK_FLIGHT_DATA: Itinerary[] = [
//   {
//     id: "mock-1",
//     price: { raw: 122124, formatted: "$1,221" },
//     legs: [
//       {
//         id: "mock-leg-1-out",
//         origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         durationInMinutes: 1584,
//         stopCount: 2,
//         departure: "2024-08-09T04:55:00",
//         arrival: "2024-08-10T09:29:00",
//         carriers: {
//           marketing: [{ 
//             id: 1, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/6E.png", 
//             name: "IndiGo, Virgin Atlantic", 
//             operationType: "codeshare" 
//           }]
//         }
//       },
//       {
//         id: "mock-leg-1-return",
//         origin: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         destination: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         durationInMinutes: 1620,
//         stopCount: 1,
//         departure: "2024-08-16T14:30:00",
//         arrival: "2024-08-18T05:30:00",
//         carriers: {
//           marketing: [{ 
//             id: 1, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/6E.png", 
//             name: "IndiGo, Virgin Atlantic", 
//             operationType: "codeshare" 
//           }]
//         }
//       }
//     ]
//   },
//   {
//     id: "mock-2",
//     price: { raw: 135238, formatted: "$1,352" },
//     legs: [
//       {
//         id: "mock-leg-2-out",
//         origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         durationInMinutes: 1240,
//         stopCount: 1,
//         departure: "2024-08-09T04:00:00",
//         arrival: "2024-08-09T15:10:00",
//         carriers: {
//           marketing: [{ 
//             id: 2, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/QR.png", 
//             name: "Qatar Airways", 
//             operationType: "fully_operated" 
//           }]
//         }
//       },
//       {
//         id: "mock-leg-2-return",
//         origin: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         destination: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         durationInMinutes: 1380,
//         stopCount: 1,
//         departure: "2024-08-16T22:15:00",
//         arrival: "2024-08-18T07:15:00",
//         carriers: {
//           marketing: [{ 
//             id: 2, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/QR.png", 
//             name: "Qatar Airways", 
//             operationType: "fully_operated" 
//           }]
//         }
//       }
//     ]
//   },
//   {
//     id: "mock-3",
//     price: { raw: 136520, formatted: "$1,365" },
//     legs: [
//       {
//         id: "mock-leg-3-out",
//         origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         durationInMinutes: 1220,
//         stopCount: 1,
//         departure: "2024-08-09T06:45:00",
//         arrival: "2024-08-09T17:35:00",
//         carriers: {
//           marketing: [{ 
//             id: 3, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/BA.png", 
//             name: "British Airways", 
//             operationType: "fully_operated" 
//           }]
//         }
//       },
//       {
//         id: "mock-leg-3-return",
//         origin: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         destination: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         durationInMinutes: 1290,
//         stopCount: 1,
//         departure: "2024-08-16T11:20:00",
//         arrival: "2024-08-17T18:50:00",
//         carriers: {
//           marketing: [{ 
//             id: 3, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/BA.png", 
//             name: "British Airways", 
//             operationType: "fully_operated" 
//           }]
//         }
//       }
//     ]
//   },
//   {
//     id: "mock-4",
//     price: { raw: 150945, formatted: "$1,509" },
//     legs: [
//       {
//         id: "mock-leg-4-out",
//         origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         durationInMinutes: 1320,
//         stopCount: 1,
//         departure: "2024-08-09T02:10:00",
//         arrival: "2024-08-09T15:00:00",
//         carriers: {
//           marketing: [{ 
//             id: 4, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/LH.png", 
//             name: "Lufthansa", 
//             operationType: "fully_operated" 
//           }]
//         }
//       },
//       {
//         id: "mock-leg-4-return",
//         origin: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         destination: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         durationInMinutes: 1440,
//         stopCount: 1,
//         departure: "2024-08-16T16:45:00",
//         arrival: "2024-08-18T04:45:00",
//         carriers: {
//           marketing: [{ 
//             id: 4, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/LH.png", 
//             name: "Lufthansa", 
//             operationType: "fully_operated" 
//           }]
//         }
//       }
//     ]
//   },
//   {
//     id: "mock-5",
//     price: { raw: 89999, formatted: "$899" },
//     legs: [
//       {
//         id: "mock-leg-5-out",
//         origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         durationInMinutes: 900,
//         stopCount: 0,
//         departure: "2024-08-09T23:30:00",
//         arrival: "2024-08-10T09:30:00",
//         carriers: {
//           marketing: [{ 
//             id: 5, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AI.png", 
//             name: "Air India", 
//             operationType: "fully_operated" 
//           }]
//         }
//       },
//       {
//         id: "mock-leg-5-return",
//         origin: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
//         destination: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
//         durationInMinutes: 930,
//         stopCount: 0,
//         departure: "2024-08-16T12:00:00",
//         arrival: "2024-08-17T08:30:00",
//         carriers: {
//           marketing: [{ 
//             id: 5, 
//             logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AI.png", 
//             name: "Air India", 
//             operationType: "fully_operated" 
//           }]
//         }
//       }
//     ]
//   }
// ];

// constants/flight.constants.ts
import type { Itinerary } from '../types/flight.types';



export const API_CONFIG = {
  // KEY: 'dcb445926amsh78b973ce80d3c11p1f3569jsn1b223ee2f34c',
  KEY: 'c7a80e99efmsh3ac69df52bd0ff6p14051fjsn7cc986131f06',
  HOST: 'sky-scrapper.p.rapidapi.com',
  BASE_URL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights'
};

export const TRIP_TYPE_OPTIONS = [
  { value: 'round-trip', label: 'Round trip' },
  { value: 'one-way', label: 'One way' }
];

export const PASSENGER_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' }
];

export const TRAVEL_CLASS_OPTIONS = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' }
];

export const SORT_OPTIONS = [
  { value: 'best', label: 'Best' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'fastest', label: 'Fastest' }
];

export const STOPS_OPTIONS = [
  { value: 'any', label: 'Any number of stops' },
  { value: 'nonstop', label: 'Nonstop only' },
  { value: '1stop', label: '1 stop or fewer' },
  { value: '2stops', label: '2 stops or fewer' }
];

export const AIRLINES_OPTIONS = [
  { value: 'all', label: 'All airlines' },
  { value: 'indigo', label: 'IndiGo' },
  { value: 'airindia', label: 'Air India' },
  { value: 'qatar', label: 'Qatar Airways' },
  { value: 'british', label: 'British Airways' },
  { value: 'lufthansa', label: 'Lufthansa' },
  { value: 'virgin', label: 'Virgin Atlantic' },
  { value: 'emirates', label: 'Emirates' }
];

export const PRICE_RANGE = {
  min: 50000,
  max: 300000,
  step: 5000
};

export const MOCK_FLIGHT_DATA: Itinerary[] = [
  {
    id: "mock-1",
    price: { raw: 122124, formatted: "₹1,22,124" },
    legs: [
      {
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
      }
    ],
    roundTrip: true,
    totalDuration: 3128,
    emissions: { amount: 750, unit: "kg CO₂", change: -15 }
  },
  {
    id: "mock-2",
    price: { raw: 135238, formatted: "₹1,35,238" },
    legs: [
      {
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
      }
    ],
    roundTrip: true,
    totalDuration: 2620,
    emissions: { amount: 1003, unit: "kg CO₂", change: 13 }
  },
  {
    id: "mock-3",
    price: { raw: 136520, formatted: "₹1,36,520" },
    legs: [
      {
        id: "mock-leg-3-out",
        origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
        destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
        durationInMinutes: 1220,
        stopCount: 1,
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
        stops: ["LHR"],
        emissions: { amount: 825, unit: "kg CO₂", change: -7 }
      }
    ],
    roundTrip: true,
    totalDuration: 2510,
    emissions: { amount: 825, unit: "kg CO₂", change: -7 }
  },
  {
    id: "mock-4",
    price: { raw: 150945, formatted: "₹1,50,945" },
    legs: [
      {
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
      }
    ],
    roundTrip: true,
    totalDuration: 2760,
    emissions: { amount: 839, unit: "kg CO₂", change: 0 }
  },
  {
    id: "mock-5",
    price: { raw: 138315, formatted: "₹1,38,315" },
    legs: [
      {
        id: "mock-leg-5-out",
        origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
        destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
        durationInMinutes: 1685,
        stopCount: 2,
        departure: "2024-08-09T14:10:00",
        arrival: "2024-08-10T08:45:00",
        carriers: {
          marketing: [{ 
            id: 5, 
            logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/LH.png", 
            name: "Lufthansa, United", 
            operationType: "codeshare" 
          }]
        },
        stops: ["MUC", "BOS"],
        emissions: { amount: 929, unit: "kg CO₂", change: 0 }
      }
    ],
    roundTrip: true,
    totalDuration: 3370,
    emissions: { amount: 929, unit: "kg CO₂", change: 0 }
  },
  {
    id: "mock-6",
    price: { raw: 147329, formatted: "₹1,47,329" },
    legs: [
      {
        id: "mock-leg-6-out",
        origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
        destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
        durationInMinutes: 1755,
        stopCount: 2,
        departure: "2024-08-09T19:15:00",
        arrival: "2024-08-10T15:00:00",
        carriers: {
          marketing: [{ 
            id: 6, 
            logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/6E.png", 
            name: "IndiGo, Air France", 
            operationType: "codeshare" 
          }]
        },
        stops: ["DEL", "CDG"],
        emissions: { amount: 836, unit: "kg CO₂", change: -6 }
      }
    ],
    roundTrip: true,
    totalDuration: 3510,
    emissions: { amount: 836, unit: "kg CO₂", change: -6 }
  },
  {
    id: "mock-7",
    price: { raw: 157350, formatted: "₹1,57,350" },
    legs: [
      {
        id: "mock-leg-7-out",
        origin: { id: "BLR", name: "Bengaluru", displayCode: "BLR", city: "Bengaluru" },
        destination: { id: "JFK", name: "New York JFK", displayCode: "JFK", city: "New York" },
        durationInMinutes: 1564,
        stopCount: 2,
        departure: "2024-08-09T14:10:00",
        arrival: "2024-08-10T06:44:00",
        carriers: {
          marketing: [{ 
            id: 7, 
            logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/LH.png", 
            name: "Lufthansa, United", 
            operationType: "codeshare" 
          }]
        },
        stops: ["MUC", "IAD"],
        emissions: { amount: 874, unit: "kg CO₂", change: 0 }
      }
    ],
    roundTrip: true,
    totalDuration: 3128,
    emissions: { amount: 874, unit: "kg CO₂", change: 0 }
  }
];