import { useState, useEffect } from 'react';
import { Itinerary, SavedDocument, ChecklistItem, UserProfile, RideOption } from '../types';

const INITIAL_ITINERARIES: Itinerary[] = [
  {
    id: 'trip-1',
    type: 'flight',
    carrierCode: 'AI 202',
    carrierName: 'Air India',
    pnr: 'X7Y8Z9',
    originCode: 'LHR',
    originCity: 'London',
    destCode: 'JFK',
    destCity: 'New York',
    departureDate: '2026-08-09',
    departureTime: '06:15 AM',
    gate: 'B12',
    terminalOrPlatform: 'T2',
    status: 'On Time',
    leaveHomeMinutes: 25,
    trafficSummary: 'Traffic is light to JFK.',
    bagDropSecondsRemaining: 2700, // 45 mins
    weatherOrigin: { city: 'JFK', code: 'JFK', temp: '22°C', condition: 'Sunny', icon: 'sunny' },
    weatherDest: { city: 'LHR', code: 'LHR', temp: '15°C', condition: 'Rainy', icon: 'rainy' }
  },
  {
    id: 'trip-2',
    type: 'train',
    carrierCode: '12301',
    carrierName: 'Express Rail',
    pnr: 'TR99482',
    originCode: 'NDLS',
    originCity: 'New Delhi',
    destCode: 'HWH',
    destCity: 'Howrah',
    departureDate: '2026-08-10',
    departureTime: '04:30 PM',
    gate: 'P2',
    terminalOrPlatform: 'Platform 2',
    status: 'On Time',
    leaveHomeMinutes: 40,
    trafficSummary: 'Moderate traffic near Central Rail.',
    bagDropSecondsRemaining: 5400,
    weatherOrigin: { city: 'NDLS', code: 'DEL', temp: '34°C', condition: 'Clear', icon: 'sunny' },
    weatherDest: { city: 'HWH', code: 'CCU', temp: '29°C', condition: 'Humid', icon: 'partly_cloudy_day' }
  }
];

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', label: 'Passport', icon: 'badge', checked: true },
  { id: 'c2', label: 'Power Bank', icon: 'battery_charging_full', checked: true },
  { id: 'c3', label: 'Wallet', icon: 'wallet', checked: false },
  { id: 'c4', label: 'Meds / Rx', icon: 'medical_services', checked: false },
  { id: 'c5', label: 'Boarding Pass', icon: 'confirmation_number', checked: true }
];

const INITIAL_DOCUMENTS: SavedDocument[] = [
  {
    id: 'doc-1',
    title: 'Passport Copy',
    subtitle: 'Expires 2029',
    icon: 'badge',
    category: 'passport',
    pnr: 'US-9830219'
  },
  {
    id: 'doc-2',
    title: 'Grand Hyatt Voucher',
    subtitle: 'Check-in: Oct 12',
    icon: 'hotel',
    category: 'hotel',
    pnr: 'HYATT-8832'
  },
  {
    id: 'doc-3',
    title: 'Travel Insurance',
    subtitle: 'Allianz Global Policy #9921',
    icon: 'health_and_safety',
    category: 'insurance',
    pnr: 'AZ-441092'
  }
];

const INITIAL_PROFILE: UserProfile = {
  name: 'Alex Walker',
  role: 'Pro Member',
  memberId: '884-291X',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  availableMiles: 42500,
  transitPoints: 1840,
  aiAlertsEnabled: true,
  highContrastEnabled: false,
  emergencyContacts: [
    { id: 'ec-1', name: 'Sarah Walker', relationship: 'Spouse', phone: '+1 (555) 234-5678' },
    { id: 'ec-2', name: 'David Walker', relationship: 'Brother', phone: '+1 (555) 876-5432' }
  ]
};

export function useTravelStore() {
  const [itineraries, setItineraries] = useState<Itinerary[]>(() => {
    const saved = localStorage.getItem('travel_itineraries');
    return saved ? JSON.parse(saved) : INITIAL_ITINERARIES;
  });

  const [activeTripId, setActiveTripId] = useState<string>(() => {
    return localStorage.getItem('travel_active_trip_id') || 'trip-1';
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('travel_checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });

  const [documents, setDocuments] = useState<SavedDocument[]>(() => {
    const saved = localStorage.getItem('travel_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('travel_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isAddTripOpen, setIsAddTripOpen] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<SavedDocument | null>(null);
  const [activeRideBooking, setActiveRideBooking] = useState<RideOption | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('travel_itineraries', JSON.stringify(itineraries));
  }, [itineraries]);

  useEffect(() => {
    localStorage.setItem('travel_active_trip_id', activeTripId);
  }, [activeTripId]);

  useEffect(() => {
    localStorage.setItem('travel_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('travel_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('travel_profile', JSON.stringify(profile));
  }, [profile]);

  const activeTrip = itineraries.find(t => t.id === activeTripId) || itineraries[0];

  const addItinerary = (newTrip: Omit<Itinerary, 'id'>) => {
    const id = `trip-${Date.now()}`;
    const trip: Itinerary = { ...newTrip, id };
    setItineraries(prev => [trip, ...prev]);
    setActiveTripId(id);
  };

  const toggleChecklist = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const addChecklistItem = (label: string, icon: string = 'check_circle') => {
    const newItem: ChecklistItem = {
      id: `c-${Date.now()}`,
      label,
      icon,
      checked: false
    };
    setChecklist(prev => [...prev, newItem]);
  };

  const addDocument = (doc: Omit<SavedDocument, 'id'>) => {
    const newDoc: SavedDocument = {
      ...doc,
      id: `doc-${Date.now()}`
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const toggleAiAlerts = () => {
    setProfile(prev => ({ ...prev, aiAlertsEnabled: !prev.aiAlertsEnabled }));
  };

  const toggleHighContrast = () => {
    setProfile(prev => ({ ...prev, highContrastEnabled: !prev.highContrastEnabled }));
  };

  return {
    itineraries,
    activeTrip,
    activeTripId,
    setActiveTripId,
    addItinerary,
    checklist,
    toggleChecklist,
    addChecklistItem,
    documents,
    addDocument,
    profile,
    toggleAiAlerts,
    toggleHighContrast,
    simulatedOffline,
    setSimulatedOffline,
    isScannerOpen,
    setIsScannerOpen,
    isAddTripOpen,
    setIsAddTripOpen,
    selectedDoc,
    setSelectedDoc,
    activeRideBooking,
    setActiveRideBooking
  };
}
