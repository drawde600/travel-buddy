# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Travel Buddy is a personal travel planning application for a Japan June 2026 trip. Built with React Native, Expo SDK 54, and TypeScript, targeting Expo Web first, then iOS and Android.

**Current version:** v0.2.0 (functional prototype)

**Development approach:** Local-only with hardcoded TypeScript data files. No backend, database, authentication, or cloud services in v0.2.

## Essential Documentation

The project has two key documents that define scope and track progress:

- **`TravelBuddy_Project_Spec_v0.2.md`** - Single source of truth for product scope, requirements, and event types
- **`tasks_v0.2.md`** - Development strategy, implementation tracking, and phase-by-phase execution plan

When planning work, always check these files first. The spec defines product requirements; the tasks file tracks development strategy and completed work.

## Development Commands

### Install Dependencies
```powershell
npm install
```

If installation was interrupted, clean and reinstall:
```powershell
Remove-Item -LiteralPath node_modules -Recurse -Force
npm install
```

### Run Development Servers
```powershell
# Web only
npm run web

# Choose target in Expo terminal UI
npm start
```

Both commands use a custom start script that sets `EXPO_NO_DEPENDENCY_VALIDATION=1` to work around Expo SDK 54 CLI dependency checking issues.

### Type Checking
```powershell
npm run typecheck
```

Runs TypeScript compiler without emitting files. Equivalent to `tsc --noEmit`.

## Project Architecture

### Data Model Structure
```
Trip
  TripDay[]
    ItineraryEvent[]
      TodoItem[]
      Money (cost)
      ContactInfo
```

### Type Definitions
Core types are defined in `src/models/itinerary.ts`:
- `EventType` - 13 event types: flight, hotel, shinkansen, train, airportTrain, taxi, restaurant, activity, shopping, freeTime, note, todo
- `ItineraryEvent` - Main event structure with optional cost, contact, todos, and GPS coordinates
- `TripDay` - Day container with date, labeling, and events array
- `Trip` - Top-level container for the entire journey
- **NEW in v0.2**: `AirportTrainOption` for complex train routing, enhanced `Location` with bilingual support

### Source Organization
```
src/
  models/         # TypeScript type definitions
  data/           # Hardcoded trip data (japan_trip_june_2026.ts)
  components/     # React components
    itinerary/   # Itinerary-specific views
  utils/         # Shared utility functions
  config/        # Configuration files (simulation settings)
App.tsx          # Root component
```

### Component Architecture
Current implementation focuses on a single-day view with comprehensive features:
- `DayItineraryView` - Main per-day itinerary component with day navigation, event list, GPS distance calculations, and detail modals
- Event cards use color-coded types and display relevant information based on event type
- Event detail modals show comprehensive information including GPS coordinates, maps, bilingual addresses, and specialized train options
- Event-specific cards deferred in favor of generic but informative cards for v0.2

## Development Phases (Current Status)

**Phase 1: Project Scaffold** ✅ Complete
- Expo + React Native + TypeScript scaffold established

**Phase 2: Initial DayItineraryView UI** ✅ Complete
- Basic per-day view with day navigation, event list, time display, and flight numbers

**Phase 3: User Data Intake** ✅ Complete
- Real Japan June 2026 trip data integrated (14 events on Day 1, departure on Day 6)
- Models refined based on actual travel requirements (airport trains, bilingual addresses, GPS coordinates)

**Phase 4: Itinerary Navigation** ✅ Complete
- Full day navigation system with previous/next controls
- Day progress labels (Day 1/6, Day 2/6, etc.)
- Date display and custom day labels (Pre-trip)

**Phase 5: Timeline Layout** ✅ Complete
- Hour timeline with time-based event positioning
- Empty segment handling for gaps
- Vertical scrolling with proper event duration representation

**Phase 6: Event Cards** ✅ Partial (Generic cards implemented)
- Generic but informative event cards with color coding
- Event-specific icons and time display
- GPS distance calculations for upcoming events
- Specialized cards deferred to future versions

**Phase 7: Event Detail View** ✅ Complete
- Comprehensive event detail modals
- Google Maps integration for GPS-enabled events
- Bilingual address display for hotels
- Airport train system with target/backup/avoid options
- Website and contact information display

**Phase 8: Todo Display** 📋 Planned (Data model complete)
- Todo item types defined in data model
- UI implementation deferred

**Phase 9: Cost Display** 📋 Planned (Data model complete)
- Cost tracking types defined in data model
- UI implementation deferred

**Phase 10: Verification** 🚧 Active
- TypeScript type checking functional
- Manual testing completed for Day 1 events
- GPS and distance calculations verified

## Key Features Implemented in v0.2

### GPS and Distance Calculations
- Haversine formula for accurate distance measurement
- Distance display only for upcoming events
- Simulation configuration for testing location features
- Google Maps integration for all GPS-enabled events

### Airport Train System
- Specialized event type for uncertain airport connections
- Target train with backup and avoid options
- Japanese names for announcement board matching
- GPS coordinates for destination stations
- Comprehensive modal display of all train options

### Bilingual Support
- English and Japanese names for locations
- Bilingual address display for hotels and venues
- Full-screen address card modal for showing to taxi drivers
- Language toggle functionality
- Essential for Japan travel where English may be limited

### Event Type Features
- **Flight**: Flight numbers, airport locations, arrival/departure handling
- **Hotel**: Check-in/out display, bilingual address cards, booking IDs
- **Airport Train**: Complex routing with multiple backup options
- **Standard events**: Time-based positioning, location display, contact information

### Simulation and Testing
- `src/config/simulation.ts` for time and location testing
- Test GPS calculations from different locations
- Simulate different times for testing event filtering
- No need to wait for real-time events to verify functionality

## Important Constraints

### Expo SDK 54 Specifics
- Targeting SDK 54 for compatibility with user's Expo Go app
- Custom start script works around dependency validation issues
- Babel preset resolved from `expo/node_modules/babel-preset-expo`

### Data Storage Philosophy
- v0.2 is intentionally local-only with hardcoded TypeScript
- No persistence, no backend, no external calendar libraries
- Trip data stored in `src/data/` as TypeScript objects
- Easy to edit by hand is a priority over abstraction

### Styling Approach
- Uses React Native StyleSheet with inline style definitions
- Simple but readable styling for Expo Web
- Responsive design principles (max-width containers, flexible layouts)

## Working Patterns

### Adding New Event Data
Edit `src/data/japan_trip_june_2026.ts` to add trip days and events. Follow the type definitions in `src/models/itinerary.ts`.

**Data Entry Best Practices:**
- Use short durations for point events (flights: 15 min, hotel check-in: 10 min)
- Include GPS coordinates for all locations to enable mapping features
- Add bilingual names/addresses for Japan travel locations
- For airport trains, include multiple backup options for contingency planning
- Use specific event types to get appropriate icons and colors

### Testing GPS and Time Features
Edit `src/config/simulation.ts` to test location and time-based features:
- Set `SIMULATED_CURRENT_LOCATION` to test distance calculations from different coordinates
- Set `SIMULATED_CURRENT_TIME` to test upcoming event filtering
- Set `SIMULATED_CURRENT_DATE` to test opening on specific trip days

### Creating New Components
- Follow the existing structure in `src/components/`
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Define styles as StyleSheet.create within component files

### Utility Functions
Add shared utilities to `src/utils/`. Existing utilities include day label formatting and event time display logic.

## Development Philosophy

From the tasks file: "Build the smallest useful itinerary UI first, then refine the details from real trip data."

This means:
- Start with minimum effort for the first usable screen
- Use placeholder/sample data only as needed
- Let real data drive model refinements
- Avoid over-modeling before seeing actual use cases
- Prefer concrete outcomes over vague intentions

## Version Management

When the project versions up (e.g., v0.2 → v0.3):
1. Create new spec file: `TravelBuddy_Project_Spec_v0.3.md`
2. Create new tasks file: `tasks_v0.3.md`
3. Carry forward only incomplete tasks that match the new spec
4. Keep spec as the source of truth for matching tasks file

The current files are version-controlled artifacts that preserve development history and decision rationale.
