// Simulation Configuration
// Edit these values to test distance calculations and time-based features

// Current location (for distance calculations)
export const SIMULATED_CURRENT_LOCATION = {
  // At KOKO HOTEL Asakusa (after check-in)
  latitude: 35.7077411,
  longitude: 139.7960929

  // Or test from different locations:
  // latitude: 35.5446472, // Haneda Airport
  // longitude: 139.7652128
  //
  // latitude: 35.7098669, // Asakusa Station
  // longitude: 139.7945926
};

// Simulated current date (optional, for opening on specific day)
// Format: "YYYY-MM-DD"
// Set to null to open on first day
export const SIMULATED_CURRENT_DATE: string | null = "2026-06-13"; // Day 2

// Simulated current time (optional, for testing time-based features)
// Format: "HH:MM" in 24-hour format
// Set to null to use actual current time
export const SIMULATED_CURRENT_TIME: string | null = "08:00"; // Morning

// Demo scenarios:
// 1. Day 1 arrival (June 12): date "2026-06-12", time "05:00", location: Haneda
// 2. Day 1 hotel (June 12): date "2026-06-12", time "09:00", location: Hotel
// 3. Day 2 morning (June 13): date "2026-06-13", time "08:00", location: Hotel