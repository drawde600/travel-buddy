export type EventType =
  | "flight"
  | "hotel"
  | "shinkansen"
  | "train"
  | "airportTrain"
  | "taxi"
  | "restaurant"
  | "activity"
  | "shopping"
  | "freeTime"
  | "note"
  | "todo";

export type Currency = "JPY" | "PHP" | "USD";

export type Money = {
  amount: number;
  currency: Currency;
  paid?: boolean;
  paymentMethod?: string;
  notes?: string;
};

export type ContactInfo = {
  contactPerson?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  lineId?: string;
  notes?: string;
};

export type Location = {
  name: string;
  nameJa?: string; // Japanese name
  latitude?: number;
  longitude?: number;
  address?: string;
  addressJa?: string; // Japanese address
  website?: string; // Website URL
  phone?: string; // Phone number
  notes?: string;
};

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  dueTime?: string;
  reminderTime?: string;
  priority?: "low" | "medium" | "high";
  notes?: string;
};

export type AirportTrainOption = {
  time: string;
  arrivalTime?: string; // Arrival time at destination
  name: string;
  nameJa: string; // Japanese for announcement board matching
  destination: string;
  destinationJa?: string; // Japanese destination if available
  destinationLocation?: Location; // GPS coordinates of destination
};

export type ItineraryEvent = {
  id: string;
  type: EventType;
  title: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locationInfo?: Location; // GPS coordinates and detailed location info
  flightNumber?: string;
  notes?: string;
  cost?: Money;
  contact?: ContactInfo;
  todos?: TodoItem[];
  // Airport train specific fields
  targetTrain?: AirportTrainOption;
  backupTrains?: AirportTrainOption[];
  avoidTrains?: AirportTrainOption[];
};

export type TripDay = {
  id: string;
  date?: string;
  title?: string;
  dayNumber?: number;
  totalTripDays?: number;
  dayLabel?: string;
  isPreTrip?: boolean;
  events: ItineraryEvent[];
};

export type Trip = {
  id: string;
  title: string;
  days: TripDay[];
};
