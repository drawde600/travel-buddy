# Travel Buddy - Project Specification v0.2

## Project Overview

Travel Buddy is a personal travel planning application built using:

* React Native
* Expo
* TypeScript

Initial development target:

* Expo Web (browser)
* Later deployment to:

  * iPhone (iOS)
  * Android

The application is intended for personal travel planning and itinerary management.

No backend, database, or cloud services are required for v0.2.

All trip data will be hardcoded in TypeScript files.

---

# Design Principles

## Goals

* Fast development
* Easy maintenance
* Works in browser and mobile
* Easy to modify trip data
* No dependency on external calendar libraries
* Support future expansion

## Out of Scope (v0.2)

* Database
* Backend API
* User accounts
* Authentication
* Synchronization
* Online editing
* Multi-user support

---

# Application Requirements

The application should be organized so itinerary data, screen views, event display components, and shared utilities are easy to maintain.

Implementation-level folder structure and component breakdown should be tracked in `tasks_v0.2.md`.

---

# Main View

## Per-Day Itinerary View

The application is centered around a single day view.

### Layout

Top Section

* Day progress label, such as Day 1 / 5
* Date
* Previous Day button
* Next Day button

Body

Left side:

* Hour timeline

Right side:

* Itinerary events

Initial event display should prioritize:

* Time
* Location
* Flight number, when applicable

Events are positioned based on:

* Start time
* End time
* Duration

Timeline is vertically scrollable.

---

# Supported Event Types

The application should support these event types.

## Flight

### Event Duration Best Practices

**Flight Events:**
- **Arrival/Departure:** 15 minutes (e.g., 04:45-05:00 for arrival process)
- **Purpose:** Point-in-time activities without filling the timeline
- **Avoid:** Full-day durations that disrupt chronological flow

**Rationale:**
- Flight arrival/departure are specific moments, not all-day events
- Short duration maintains proper timeline ordering
- Allows ground transportation to be scheduled appropriately
- Prevents visual timeline clutter

### Examples

* International flight
* Domestic flight

## Hotel

Hotel events can include dual-language addresses for showing to taxi drivers or police who may only speak Japanese.

### Daily View Display

**Simplified Format (2 rows):**
- **Row 1:** "Check-in KOKO HOTEL Asakusa Komagata" + hotel icon 🏨
- **Row 2:** Time range (06:30-06:40)
- **Hidden details:** Booking ID, location, extra notes available in detail view

**Rationale:**
- Action + hotel name tells user everything needed at a glance
- Consistent 2-row format across all event types
- Extra details available in detail view when needed
- Prevents visual clutter in the timeline

### Event Duration Best Practices

**Check-in/Check-out Events:**
- **Duration:** Maximum 10 minutes (e.g., 06:30-06:40)
- **Purpose:** Proper timeline sorting without filling the entire day
- **Avoid:** Long durations that disrupt the timeline flow

**Rationale:**
- Check-in is a point-in-time activity, not an all-day event
- Short duration maintains accurate chronological ordering
- Allows other activities to be scheduled around check-in times
- Prevents visual clutter in the timeline view

### Data Structure

### Data Structure

```typescript
type Location = {
  name: string;          // English name
  nameJa?: string;       // Japanese name
  latitude?: number;
  longitude?: number;
  address?: string;      // English address
  addressJa?: string;    // Japanese address
  website?: string;      // Website URL
  phone?: string;        // Phone number
  notes?: string;
};
```

### Hotel Event Display

**Daily View (2 rows):**
* **Row 1:** "Check-in KOKO HOTEL Asakusa Komagata" 🏨
* **Row 2:** Time range (06:30-06:40)
* **Hidden:** Booking ID, location, extra notes (available in detail view)

**Detail View:**
* Google Maps button (if GPS available)
* **"🏨 Show Address Card" button** (if dual-language addresses)
* **"🌐 Visit Website" button** (if website available)
* Check-in time
* Booking confirmation ID
* Contact information

### Full-Screen Address Card

**Purpose:** Show to taxi drivers or police who may only speak Japanese

**Critical Design Principle:** 
* **Essential information only:** Hotel name + address + phone number in selected language
* **Purpose-driven:** Phone included for taxi drivers/police to call hotel if needed
* **No confusion factors:** Booking IDs, GPS coordinates, extra notes removed
* **Minimal distraction:** Clean, focused display for non-English speakers

**Features:**
* **Full-screen display:** Takes entire screen, minimal distractions
* **Minimal header:** Only "← Back" button and language toggle
* **Language toggle:** 🇯🇵 日本語 / 🇵🇸 English switch
* **Large text:** Hotel name (32px) + address (26px) for maximum readability
* **Single focus:** Just name + address, nothing else

**Display Content:**

**English Mode:**
```
KOKO HOTEL Asakusa Komagata
2 Chome-7-5 Komagata, Taito City, Tokyo 111-0043, Japan
+81-3-6777-1188
```

**Japanese Mode:**
```
KOKO HOTEL 浅草駒形
台東区駒形2-7-5, 浅草, 東京都, 日本 111-0043
+81-3-6777-1188
```

**Usage:**
* Show to taxi drivers for navigation
* Show to police for directions or verification
* Show to locals for assistance
* Language toggle for Japanese-English communication
* Phone available for drivers to call hotel if needed

**What NOT to Include:**
❌ Booking IDs (confusing for drivers)
❌ GPS coordinates (meaningless to taxi drivers)
❌ Extra contact details (creates confusion)
❌ Instructions or notes (language barrier issues)

**Phone Numbers:**
✅ **Include:** Hotel phone numbers (+81-3-6777-1188)
* **Purpose:** Taxi drivers/police can call hotel for directions or confirmation
* **When needed:** Driver unfamiliar with location, police verification, emergency contact
* **Format:** Large, readable display below address (18px font)

### Example: KOKO HOTEL Asakusa Komagata

**Address Card Display:**

**English Mode:**
```
KOKO HOTEL Asakusa Komagata
2 Chome-7-5 Komagata, Taito City, Tokyo 111-0043, Japan
```

**Japanese Mode:**
```
KOKO HOTEL 浅草駒形
台東区駒形2-7-5, 浅草, 東京都, 日本 111-0043
```

**Additional Details (available in event detail view, not address card):**
* **GPS:** 35.7077411, 139.7960929
* **Phone:** +81-3-6777-1188
* **Booking ID:** 1731147118
* **Check-in:** 6:30-6:40 AM June 12, 2026 (10 min duration)
* **Website:** https://koko-hotels.com/asakusa_komagata/

## Shinkansen

Examples:

* Tokyo → Nagano
* Nagano → Tokyo

## Train

Examples:

* JR
* Tokyo Metro
* Keio
* Toei

## Airport Train

Airport Train is a **special event type** separate from regular train events, designed for contingency planning when timing is uncertain due to factors like immigration processing.

### Use Case

When arriving at an airport with uncertain connection timing, multiple train options should be tracked:
* **Target train:** Primary choice if timing works out
* **Backup trains:** Alternative options if target is missed
* **Avoid trains:** Options to avoid (wrong destination, requires transfers, etc.)

### Data Structure

```typescript
type AirportTrainOption = {
  time: string;           // Departure time (HH:MM format)
  arrivalTime?: string;   // Arrival time at destination
  name: string;           // English train name
  nameJa: string;         // Japanese train name (for announcement board matching)
  destination: string;    // Destination name (English)
  destinationJa?: string; // Destination name (Japanese)
  destinationLocation?: Location; // GPS coordinates
};

type AirportTrainEvent = {
  type: "airportTrain";
  title: string;
  notes?: string;         // Context (e.g., flight arrival info)
  targetTrain: AirportTrainOption;    // Primary choice
  backupTrains: AirportTrainOption[]; // Backup options
  avoidTrains: AirportTrainOption[];  // Options to avoid
};
```

### Daily View Display

* **Icon:** 🚅 (special airport train icon)
* **Time column:** Shows target train departure and arrival times
* **Event card:** Displays target train time range (e.g., "5:26-06:09")
* **Pressable:** Opens detailed modal with all options

### Detail View Modal

When user clicks on airport train event, show modal with:

1. **Context notes:** Flight arrival info, timing dependencies
2. **Google Maps Button:** 📍 Opens destination in Google Maps
   * Uses GPS coordinates from destinationLocation
   * Format: `https://www.google.com/maps/@latitude,longitude,17z`
   * Opens in new tab for web, native map apps for mobile
3. **Target Train Section:** 🎯 Highlighted in blue
   * Time range: "5:26 AM-6:09 AM"
   * Train name in English and Japanese
   * Destination in English and Japanese
   * "TARGET" badge
4. **Backup Options Section:** ✅ All alternative trains
   * Chronological list with time ranges
   * English and Japanese names
   * Destinations
5. **Avoid Trains Section:** ❌ Trains to skip
   * Red/badged styling
   * Reason for avoidance (transfers, wrong destination, etc.)

### Japanese Characters

Japanese names are critical for matching announcement boards at airports/train stations. All airport train options must include:
* `nameJa`: Japanese train name (急行 印旛日本医大)
* `destinationJa`: Japanese destination name (浅草)

### GPS Coordinates

Airport train destinations include GPS coordinates for future mapping features:
```typescript
destinationLocation: {
  name: "Asakusa Station",
  latitude: 35.7098669,
  longitude: 139.7945926
}
```

### Example: Haneda to Asakusa

**Context:** Flight JL0078 arrives 04:45, timing depends on immigration

**Target Train:**
* 5:26-06:09 AM Express Imbanihon-Idai (急行 印旛日本医大)

**Backup Options:**
* 5:37-06:20 AM Rapid-Limited Express Aoto (快特 青砥)
* 5:51-06:34 AM Express Narita Airport Terminal 1 (急行 成田空港第１ターミナル)
* 6:11-06:54 AM Rapid-Limited Express Aoto (快特 青砥)
* 6:18-07:01 AM Express Narita Airport Terminal 1 (急行 成田空港第１ターミナル)
* 6:31-07:14 AM Rapid-Limited Express Inba-Nihon-Idai (快特 印旛日本医大)
* 6:38-07:21 AM Limited Express Narita Airport (特急 成田空港)
* 6:51-07:34 AM Rapid-Limited Express Aoto (快特 青砥)
* 6:58-07:41 AM Express Narita Airport Terminal 1 (急行 成田空港第１ターミナル)
* 7:11-07:54 AM Rapid-Limited Express Aoto (快特 青砥)
* 7:18-08:01 AM Express Narita Airport Terminal 1 (急行 成田空港第１ターミナル)

**Avoid Trains:**
* 6:04 AM Express Sengakuji (急行 泉岳寺) - Requires transfer
* 6:24 AM Express Sengakuji (急行 泉岳寺) - Requires transfer
* 6:44 AM Express Sengakuji (急行 泉岳寺) - Requires transfer
* 7:04 AM Express Sengakuji (急行 泉岳寺) - Requires transfer
* 7:24 AM Express Sengakuji (急行 泉岳寺) - Requires transfer

### Differences from Regular Trains

* **Departure trains:** Normal train events, no special treatment
* **Arrival trains:** Airport train events with contingency planning
* **Certainty:** Regular trains = confirmed times, Airport trains = target + backups
* **Location:** Airport trains used specifically for airport connections with uncertain timing

## Taxi

Examples:

* Hotel → Station
* Airport → Hotel

## Restaurant

Examples:

* Lunch
* Dinner
* Reservation

## Activity

Examples:

* Tokyo Skytree
* Sunshine Aquarium
* Snow Wall Tour
* TeamLabs

## Shopping

Examples:

* Don Quijote
* Ginza
* Akihabara

## Free Time

Examples:

* Explore area
* Walk around

## Note

Examples:

* Travel reminders
* Miscellaneous information

## Todo

Pre-trip preparation tasks and checklist items without specific dates or times.

Examples:

* Pay travel taxes
* Fill out travel forms
* Prepare documents
* Complete booking confirmations

---

# Cost Tracking

Every event can have an optional cost.

Cost information should support amount, currency, paid status, payment method, and notes.

Examples:

* Flight cost
* Hotel cost
* Restaurant cost
* Taxi fare
* Shopping budget

---

# Contact Information

Events and places should be able to show useful contact information such as contact person, phone number, email, website, WhatsApp, LINE ID, and notes.

---

# Location Information

Events and places can include detailed location information with GPS coordinates for mapping and navigation features.

### Data Structure

```typescript
type Location = {
  name: string;          // Location name
  latitude?: number;    // GPS latitude coordinate
  longitude?: number;   // GPS longitude coordinate
  address?: string;     // Street address (English)
  addressJa?: string;   // Street address (Japanese)
  notes?: string;       // Additional location notes
};
```

### Usage

* **Flight events:** Airport locations (e.g., Haneda Terminal 3: 35.5446472, 139.7652128)
* **Airport trains:** Destination stations with GPS coordinates
* **Hotels:** Hotel addresses and coordinates, dual-language for taxi drivers
* **Activities:** Venue locations for navigation
* **Restaurants:** Restaurant addresses for finding locations

### Future Features

GPS coordinates enable future functionality:
* Map integration showing event locations
* Distance calculations between locations
* Navigation and routing features
* Location-based reminders and notifications
* Travel time estimates between locations

### Current Implementation

**Google Maps Integration:**
* **All events with GPS coordinates:** "📍 Open in Google Maps" button in detail view
* **Supported event types:** Flights, hotels, activities, restaurants, airport trains, etc.
* **Link format:** `https://www.google.com/maps/@latitude,longitude,17z`
* **Behavior:** Opens in new tab (web) or native app (mobile)
* **Examples:**
  * Haneda Airport Terminal 3 → https://www.google.com/maps/@35.5446472,139.7652128,17z
  * Asakusa Station → https://www.google.com/maps/@35.7098669,139.7945926,17z

**Dual-Language Address Display:**
* **Hotels with Japanese addresses:** "🏨 Show Address Card" button
* **Full-screen modal:** Large text for showing to taxi drivers/police
* **Language toggle:** Switch between English/Japanese addresses
* **Purpose:** Help with navigation when showing to locals who may only speak Japanese

**Website Links:**
* **Events with websites:** "🌐 Visit Website" button
* **Opens in new tab:** For accessing booking confirmations, menus, etc.
* **Green color:** (#059669) to distinguish from other action buttons

**Event Detail View:**
* **Opening criteria:** Events with GPS coordinates, notes, flight numbers, or other relevant info
* **Airport trains:** Full train options display
* **Other events:** Time, location, flight info, notes, address, and maps button

**Distance Calculation:**
* **Purpose:** Show how far upcoming events are from current location
* **Algorithm:** Haversine formula for accurate GPS distance calculation on Earth's surface
* **Display format:** 
  * ≥1 km: Shows distance in kilometers (e.g., "7.2 km away")
  * <1 km: Shows distance in meters (e.g., "450 m away")
* **Time-based filtering:** Only displays distance for events that haven't passed their scheduled time
  * Events with `startTime` in the past relative to current/simulated time do not show distance
  * Prevents cluttering timeline with irrelevant distance information
* **Requirements:** 
  * Event must have `latitude` and `longitude` in `locationInfo`
  * Event must have a `startTime` to determine if it's upcoming
  * Current location coordinates (from GPS or simulation)

**Simulation Configuration:**
* **File:** `src/config/simulation.ts`
* **Purpose:** Test distance calculations and time-based features without actual GPS/hardware
* **Configuration options:**
  ```typescript
  export const SIMULATED_CURRENT_LOCATION = {
    latitude: 35.5446472,  // Starting coordinates
    longitude: 139.7652128
  };
  export const SIMULATED_CURRENT_TIME: string | null = null; // "HH:MM" format or null for actual time
  ```
* **Use cases:**
  * Test from airport coordinates to verify hotel distance calculations
  * Test time-based filtering by simulating different times of day
  * Verify GPS data accuracy before travel
  * Test UI behavior at specific locations and times
* **Examples:**
  * At Haneda Airport (35.5446472, 139.7652128) → Hotel shows ~7 km away
  * At hotel coordinates → Distance updates to nearby events
  * Simulate "06:00" time → Only shows events after 6 AM

---

# Hotel Information

Additional fields:

* Hotel Name
* Address
* Contact Information
* Confirmation Number
* Check-In Time
* Check-Out Time
* Cost

---

# Restaurant Information

Additional fields:

* Restaurant Name
* Cuisine
* Address
* Reservation Time
* Reservation Number
* Contact Information
* Cost

---

# Todo / Checklist System

Every event can have zero or more checklist items.

Todo items should support title, completed state, optional due date/time, optional reminder time, priority, and notes.

Pre-trip days should be supported for preparation tasks such as filling out forms, checking requirements, packing, and booking confirmations.

---

## Examples

Flight

* Online check-in
* Pack passport
* Check baggage allowance

Hotel

* Save confirmation number
* Verify check-in time
* Contact hotel

Restaurant

* Make reservation
* Verify opening hours

Activity

* Buy tickets
* Print voucher

Shopping

* Buy souvenirs
* Buy snacks

---

# Event Detail View

Selecting an event opens details for events with relevant information.

## Opening Criteria

Events open in detail view if they have:
* GPS coordinates (latitude/longitude)
* Notes
* Flight numbers
* Other relevant information

## Display Content

### Airport Train Events
* Google Maps button to destination
* Context notes
* Target train details
* Backup train options
* Trains to avoid

### Other Event Types
* **GPS Location:** "📍 Open in Google Maps" button (if coordinates available)
* **Time:** ⏰ Start and end times
* **Location:** 📍 Location name
* **Flight Info:** ✈️ Flight numbers
* **Notes:** 📝 Additional information
* **Address:** 🏠 Street address (if available)

### Future Implementation
* Cost information when present
* Contact information when present
* Todo list when present

---

# Daily Summary

Top of screen should display:

Example:

```text
Day 1 / 5
June 12, 2026
```

---

# Sample Initial Trip

Target trip:

Japan June 2026

Potential itinerary includes:

* Manila
* Haneda Airport
* Tokyo
* Oshiage
* Tokyo Skytree
* Ikebukuro
* Sunshine Aquarium
* Kawagoe
* Mt. Takao
* Nagano
* Tateyama Kurobe Snow Wall
* Matsumoto
* Yokohama Ramen Museum

---

# Future Enhancements

## Phase 2

* JSON data instead of TypeScript hardcoding
* Editable todos
* Local storage persistence

## Phase 3

* Push reminders
* Device notifications
* Offline trip backups

## Phase 4

* Import/export trip files
* Share itinerary
* Multiple trips

---

# Current Version

Travel Buddy v0.2.0
Status: Functional prototype with real trip data
Technology: React Native 0.81.0 + Expo SDK 54 + TypeScript
Data Storage: Hardcoded TypeScript
Backend: None
Database: None

## Implementation Status

### ✅ Completed Features
* Project scaffold with Expo SDK 54 + TypeScript strict mode
* DayItineraryView with day navigation (Day 1/6, Day 2/6, etc.)
* 13 event types with specialized handling and color coding
* Real Japan June 2026 trip data integration
* GPS-based distance calculations (Haversine formula)
* Airport train system with target/backup/avoid options
* Bilingual location support (English/Japanese)
* Event detail modals with comprehensive information
* Google Maps integration for all GPS-enabled events
* Simulation configuration for testing time/location features
* Timeline-based event display with empty segment handling
* Responsive design optimized for Expo Web (max-width: 920px)

### 🚧 Active Development
* Days 2-5 trip data entry (currently have Day 1 and Day 6)
* Todo system UI implementation (data model complete)
* Cost display in detail views (data model complete)

### 📋 Planned Features
* Event-specific card components (currently using generic cards)
* Todo item completion state management
* Cost summary views and daily totals
* Pre-trip task dashboard
* Push reminders and device notifications (future versions)
* Local storage persistence (future versions)

## Real Trip Data Summary

**Trip**: Japan June 2026 (6 days)
**Locations**: Tokyo, Asakusa, Haneda Airport, Oshiage, Marunouchi
**Events Implemented**: 14 events on Day 1, departure flight on Day 6
**Data Quality**: Production-ready with GPS coordinates, bilingual addresses, reservation numbers

### Key Implemented Events
* ✈️ Flight JL0078 arrival (JL0077 departure)
* 🏨 KOKO HOTEL Asakusa with bilingual address support
* 🚅 Airport train system with 10 backup options and 5 avoid options
* 🚌 Tokyo bus tour (Red/Green/Blue lines) with precise timing
* 🍽️ Restaurant reservation (Izakaya Tsubohachi)

### Technical Highlights
* **GPS Integration**: All locations have accurate coordinates for mapping
* **International Ready**: Japanese names for announcement boards, bilingual addresses
* **Contingency Planning**: Comprehensive backup train options for real-world travel uncertainty
* **Production Quality**: Real reservation numbers, booking IDs, contact information
