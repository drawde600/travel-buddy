# Travel Buddy Tasks v0.2

## How To Use This File

This file is the working execution artifact for `TravelBuddy_Project_Spec_v0.2.md`.

Rules:

* `TravelBuddy_Project_Spec_v0.2.md` is the single source of truth for product scope, requirements, and version intent.
* `tasks_v0.2.md` tracks development strategy, completed work, active work, and remaining todos for spec version `v0.2`.
* Do not add product requirements here that are not already in the matching spec. If scope changes, update the spec first.
* When the project versions up, create the matching task file, for example `tasks_v0.3.md`, and align it with `TravelBuddy_Project_Spec_v0.3.md`.
* Each versioned task file should preserve useful historical context while clearly marking what is complete, in progress, deferred, or out of scope.
* Keep task entries practical and checkable. Prefer concrete outcomes over vague intentions.

Status markers:

* `[ ]` Not started
* `[~]` In progress
* `[x]` Done
* `[-]` Deferred or intentionally skipped for this version

---

# Artifact Definitions

## Product Specification

File: `TravelBuddy_Project_Spec_v0.2.md`

Purpose:

* Defines the product scope for Travel Buddy `v0.2`.
* Defines supported platforms, data storage expectations, product requirements, event types, and future phases.
* Acts as the single source of truth for this version.

Editing rule:

* Update this file only when changing product scope, architecture, or version intent.

## Development Tasks

File: `tasks_v0.2.md`

Purpose:

* Combines development strategy, implementation tracking, completed work, and todo management.
* Converts the specification into executable development steps.
* Records verification performed during the version.

Editing rule:

* Update this file as work progresses.
* Keep it synchronized with the matching spec version.

## App Source

Current minimal scaffold:

```text
src/
  models/
    itinerary.ts
  data/
    japan_trip_june_2026.ts
  components/
    itinerary/
      DayItineraryView.tsx
  utils/
    itineraryUtils.ts
App.tsx
```

Deferred until after the first `DayItineraryView` pass:

* Screens such as `ItineraryDayScreen.tsx` and `EventDetailScreen.tsx`.
* Shared item card components.
* Event type specific card components.
* Todo display components.

Purpose:

* Contains the Expo React Native application.
* Keeps hardcoded trip data and simple TypeScript models local for `v0.2`.

Editing rule:

* Follow this structure unless Expo scaffolding establishes a better local convention.
* Keep structural decisions here, not in the product specification.

## Data Model Implementation Notes

These are implementation notes for the TypeScript app. They should support the product requirements in `TravelBuddy_Project_Spec_v0.2.md` without becoming independent product scope.

Planned relationship:

```text
Trip
  Day
    Event
      Todo Items
```

Planned day fields:

```typescript
type TripDay = {
  id: string;
  date: string;
  title?: string;
  dayNumber?: number;
  totalTripDays?: number;
  dayLabel?: string;
  isPreTrip?: boolean;
  events: ItineraryEvent[];
};
```

Notes:

* Use `dayNumber` and `totalTripDays` for labels like `Day 1 / 5`.
* Use `isPreTrip` for preparation days before travel starts.
* Use `dayLabel` when a day needs a custom label, such as `Pre-trip` or `Forms and packing`.
* Pre-trip days can still contain todo/checklist events.

Planned cost shape:

```typescript
type Money = {
  amount: number;
  currency: "JPY" | "PHP" | "USD";
  paid?: boolean;
  paymentMethod?: string;
  notes?: string;
};
```

Planned contact shape:

```typescript
type ContactInfo = {
  contactPerson?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  lineId?: string;
  notes?: string;
};
```

Planned todo shape:

```typescript
type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  dueTime?: string;
  reminderTime?: string;
  priority?: "low" | "medium" | "high";
  notes?: string;
};
```

---

# Version Scope

Version: `v0.2`

Matching specification: `TravelBuddy_Project_Spec_v0.2.md`

Current status: Functional prototype with real trip data

In scope:

* React Native app using Expo and TypeScript.
* Expo SDK 54 for compatibility with the user's current Expo Go app.
* Expo Web as the first target.
* iOS and Android compatibility awareness.
* Hardcoded TypeScript trip data.
* Per-day itinerary view.
* Event detail view.
* Event type specific cards.
* Cost tracking in data and detail views.
* Contact information display.
* Todo/checklist display.

Out of scope:

* Backend API.
* Database.
* Authentication.
* Cloud sync.
* Online editing.
* Multi-user support.
* Persistence.
* External calendar libraries.

---

# Development Strategy

## Working Approach

Build the smallest useful itinerary UI first, then refine the details from real trip data.

Principles:

* Start with minimum effort for the first usable screen.
* Build `DayItineraryView` before deeper event detail views or specialized event cards.
* Use simple placeholder/sample data only as needed to make the first UI render.
* Let the user provide real trip data after the initial UI exists.
* Use that real data to discover missing fields, confusing model shapes, and display needs.
* Refine `TravelBuddy_Project_Spec_v0.2.md` only when the discovered detail changes product requirements.
* Refine TypeScript models and implementation notes in this file as data requirements become clearer.
* Avoid over-modeling before the first real itinerary data pass.

## Phase 1: Project Scaffold

Goal:

* Establish a minimal Expo + React Native + TypeScript app that runs on Expo Web.

Tasks:

* `[x]` Scaffold Expo app.
* `[x]` Confirm TypeScript configuration.
* `[x]` Confirm Expo Web startup path.
* `[x]` Establish only the source folders needed for the initial `DayItineraryView`.
* `[x]` Add narrow verification commands to this file once scripts exist.

## Phase 2: Initial DayItineraryView UI

Goal:

* Render the first useful per-day itinerary view with minimum effort.

Tasks:

* `[x]` Create `DayItineraryView`.
* `[x]` Render day progress label, such as `Day 1 / 5`.
* `[x]` Render a date heading.
* `[x]` Render previous day and next day controls.
* `[x]` Render a simple vertical list of itinerary events.
* `[x]` Render basic time and location fields.
* `[x]` Render flight number when the event is a flight.
* `[x]` Do not show price/cost in `DayItineraryView`.
* `[x]` Support pre-trip day labels for preparation tasks.
* `[x]` Use lightweight placeholder/sample data only if user-provided data is not available yet.
* `[x]` Keep styling simple but readable on Expo Web.
* `[x]` Defer advanced timeline positioning until the basic day view is useful.

## Phase 3: User Data Intake And Model Refinement

Goal:

* Use real trip data from the user to refine fields, models, and display needs.

Tasks:

* `[x]` Add user-provided itinerary data into hardcoded TypeScript data files.
* `[x]` Identify fields needed by actual flight, hotel, restaurant, activity, train, taxi, shopping, free time, and note entries.
* `[x]` Identify pre-trip preparation days and tasks from user-provided data.
* `[x]` Refine itinerary/event models based on real data.
* `[x]` Refine cost model based on real expenses and budgets.
* `[x]` Refine contact information model based on real bookings and venues.
* `[x]` Refine todo item model based on actual travel preparation needs.
* `[x]` Update `TravelBuddy_Project_Spec_v0.2.md` only when product requirements change.

## Phase 4: Itinerary Navigation

Goal:

* Build the main per-day itinerary workflow.

Tasks:

* `[x]` Create daily itinerary screen.
* `[x]` Show day progress label.
* `[x]` Add previous day navigation.
* `[x]` Add next day navigation.
* `[x]` Show current date.
* `[x]` Render events for the selected day.

## Phase 5: Timeline Layout

Goal:

* Present events in a readable time-based day layout.

Tasks:

* `[x]` Render hour timeline.
* `[x]` Position events by start time.
* `[x]` Represent event duration.
* `[x]` Support vertical scrolling.
* `[x]` Keep layout usable in Expo Web.
* `[x]` Avoid web-only APIs unless isolated.

## Phase 6: Event Cards

Goal:

* Provide focused card components for each supported event type.

Tasks:

* `[ ]` Create shared itinerary item card behavior.
* `[ ]` Create flight card.
* `[ ]` Create hotel card.
* `[ ]` Create shinkansen card.
* `[ ]` Create train card.
* `[ ]` Create taxi card.
* `[ ]` Create restaurant card.
* `[ ]` Create activity card.
* `[ ]` Create shopping card.
* `[ ]` Create free time card.
* `[ ]` Create note card.

## Phase 7: Event Detail View

Goal:

* Show full details for a selected event.

Tasks:

* `[x]` Open event detail view from an itinerary event.
* `[x]` Display event information.
* `[ ]` Display cost information when present.
* `[ ]` Display contact information when present.
* `[ ]` Display todo list when present.
* `[x]` Display notes when present.

## Phase 8: Todo Display

Goal:

* Render event checklist items clearly.

Tasks:

* `[ ]` Create todo list component.
* `[ ]` Create todo item row component.
* `[ ]` Show completed state.
* `[ ]` Show priority when present.
* `[ ]` Show due date/time when present.
* `[ ]` Keep todos display-only for `v0.2`.

## Phase 9: Cost Utilities And Detail Display

Goal:

* Track costs without showing price in the initial `DayItineraryView`.

Tasks:

* `[x]` Add itinerary utility functions.
* `[x]` Preserve optional cost fields in data models.
* `[ ]` Display cost details outside `DayItineraryView`, such as in event detail views.
* `[-]` Defer daily cost summary from the initial `DayItineraryView`.

## Phase 10: Verification

Goal:

* Keep checks narrow and repeatable.

Tasks:

* `[ ]` Run TypeScript typecheck once available.
* `[ ]` Run Expo or React Native lint/test scripts if present.
* `[ ]` Smoke test Expo Web itinerary navigation.
* `[ ]` Smoke test event detail display.
* `[ ]` Record verification results below.

---

# Completed Work

* `[x]` Created `TravelBuddy_Project_Spec_v0.1.md`.
* `[x]` Defined `TravelBuddy_Project_Spec_v0.1.md` as the single source of truth for `v0.1`.
* `[x]` Created `tasks_v0.1.md` as the version-matched development planning and tracking artifact.
* `[x]` Created `TravelBuddy_Project_Spec_v0.2.md` from the preserved `v0.1` baseline.
* `[x]` Created `tasks_v0.2.md` from the preserved `v0.1` baseline.
* `[x]` Created minimal Expo scaffold for `v0.2`.
* `[x]` Created initial `DayItineraryView` only, without other views or event-specific cards.
* `[x]` Added support files: itinerary models, sample trip data, and itinerary utilities.
* `[x]` Adjusted package versions to target Expo SDK 54 for Expo Go compatibility.
* `[x]` Added Expo start wrapper that disables dependency validation to avoid the SDK 54 CLI startup error.
* `[x]` Integrated real Japan June 2026 trip data (14 events on Day 1, departure on Day 6).
* `[x]` Implemented GPS-based distance calculations using Haversine formula.
* `[x]` Added airport train system with target/backup/avoid train options.
* `[x]` Implemented bilingual location support (English/Japanese) with address display modals.
* `[x]` Added Google Maps integration for all events with GPS coordinates.
* `[x]` Created event detail modals with comprehensive information display.
* `[x]` Implemented color-coded event types (13 different event types).
* `[x]` Added simulation configuration for testing time and location features.
* `[x]` Implemented time-based filtering for distance display (upcoming events only).
* `[x]` Created comprehensive itinerary data model with specialized event types.

---

# Active Work

* `[~]` Adding Days 2-5 trip data to complete the Japan June 2026 itinerary.
* `[~]` Implementing todo system UI components (data model complete).
* `[~]` Adding cost display to event detail views (data model complete).

---

# Todo Backlog

## High Priority

* `[x]` Scaffold the Expo TypeScript app.
* `[x]` Create only the initial source folders needed by `DayItineraryView`.
* `[x]` Render the first minimum-effort `DayItineraryView`.
* `[ ]` Add user-provided itinerary data when available.
* `[ ]` Refine models from actual user-provided itinerary data.

## Medium Priority

* `[ ]` Add event type specific cards.
* `[ ]` Add event detail view.
* `[ ]` Add todo/checklist display.
* `[ ]` Add precise timeline positioning.
* `[-]` Defer daily cost summary from `DayItineraryView`.

## Low Priority

* `[ ]` Polish responsive Expo Web layout.
* `[ ]` Add mobile smoke testing notes.
* `[ ]` Prepare version-up notes for `v0.3`.

---

# Verification Log

2026-05-31
- Command: Manual scaffold review
- Result: Passed
- Notes: Created the Expo/TypeScript scaffold and intentionally limited source files to `DayItineraryView` plus support files.

2026-05-31
- Command: `npm install`
- Result: Incomplete
- Notes: Dependency installation timed out on the network-mounted workspace. A partial `node_modules` folder was created.

2026-05-31
- Command: `npx tsc --noEmit`
- Result: Failed
- Notes: `npx` resolved the unsupported `tsc` package because the install did not complete normally.

2026-05-31
- Command: `node node_modules\typescript\bin\tsc --noEmit`
- Result: Failed
- Notes: The TypeScript compiler ran, but React and React Native type/package files are incomplete in the partial dependency install.

2026-05-31
- Command: Package version review
- Result: Updated
- Notes: Downgraded project dependencies to target Expo SDK 54 because the user's Expo Go supports SDK 54.

2026-05-31
- Command: Expo startup error review
- Result: Workaround added
- Notes: `expo start --web` failed in dependency validation with `Body is unusable: Body has already been read`. Added `scripts/start-expo.js` and updated npm scripts to set `EXPO_NO_DEPENDENCY_VALIDATION=1` before starting Expo.

2026-05-31
- Command: `node node_modules\typescript\bin\tsc --noEmit`
- Result: Passed
- Notes: TypeScript scaffold verification passed after dependency installation completed.

2026-05-31
- Command: Metro bundling error review
- Result: Fixed
- Notes: `npm run web` started Metro but failed because `babel-preset-expo` was not available as a top-level project dependency. Updated `babel.config.js` to resolve Expo SDK 54's bundled preset from `expo/node_modules/babel-preset-expo`.

Expo runtime smoke testing is still pending.

When checks exist, record them here using this format:

```text
YYYY-MM-DD
- Command:
- Result:
- Notes:
```

---

# Version-Up Notes

When the user requests a version upgrade:

* Create the next spec file, for example `TravelBuddy_Project_Spec_v0.3.md`.
* Create the matching task file, for example `tasks_v0.3.md`.
* Carry forward incomplete tasks only if they still match the new spec.
* Move completed version history into the completed section or a concise changelog.
* Keep `TravelBuddy_Project_Spec_v*.md` as the source of truth for each matching `tasks_v*.md`.
