export type TransitType = 'flight' | 'train';

export interface WeatherInfo {
  city: string;
  code: string;
  temp: string;
  condition: string;
  icon: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  icon: string;
  checked: boolean;
  category?: string;
}

export interface SavedDocument {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: 'passport' | 'hotel' | 'insurance' | 'ticket' | 'other';
  pnr?: string;
  expiryDate?: string;
  contentSnippet?: string;
}

export interface RideOption {
  id: string;
  provider: 'Uber' | 'Lyft' | 'Ola';
  name: string;
  price: string;
  eta: string;
  dropoffTime: string;
  isConnected?: boolean;
}

export interface Itinerary {
  id: string;
  type: TransitType;
  carrierCode: string; // e.g. "AI 202" or "12301"
  carrierName: string; // e.g. "Air India" or "Rajdhani Express"
  pnr: string; // e.g. "X7Y8Z9"
  originCode: string; // e.g. "LHR" or "NDLS"
  originCity: string; // e.g. "London" or "New Delhi"
  destCode: string; // e.g. "JFK" or "HWH"
  destCity: string; // e.g. "New York" or "Howrah"
  departureDate: string; // "2026-08-09"
  departureTime: string; // "06:15 AM"
  gate: string; // "B12" / "B42"
  terminalOrPlatform: string; // "T2" or "Platform 2"
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Departed';
  leaveHomeMinutes: number; // e.g. 25
  trafficSummary: string; // e.g. "Traffic is light to JFK"
  bagDropSecondsRemaining: number; // countdown
  weatherOrigin: WeatherInfo;
  weatherDest: WeatherInfo;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface UserProfile {
  name: string;
  role: string;
  memberId: string;
  avatarUrl: string;
  availableMiles: number;
  transitPoints: number;
  aiAlertsEnabled: boolean;
  highContrastEnabled: boolean;
  emergencyContacts: EmergencyContact[];
}
