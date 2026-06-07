# Travel Buddy Tasks v0.1

## How To Use This File

This file is the working execution artifact for `TravelBuddy_Project_Spec_v0.1.md`.

Rules:

* `TravelBuddy_Project_Spec_v0.1.md` is the single source of truth for product scope, requirements, and version intent.
* `tasks_v0.1.md` tracks development strategy, completed work, active work, and remaining todos for spec version `v0.1`.
* Do not add product requirements here that are not already in the matching spec. If scope changes, update the spec first.
* When the project versions up, create the matching task file, for example `tasks_v0.2.md`, and align it with `TravelBuddy_Project_Spec_v0.2.md`.
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

File: `TravelBuddy_Project_Spec_v0.1.md`

Purpose:

* Defines the product scope for Travel Buddy `v0.1`.
* Defines supported platforms, data storage expectations, product requirements, event types, and future phases.
* Acts as the single source of truth for this version.

Editing rule:

* Update this file only when changing product scope, architecture, or version intent.

## Development Tasks

File: `tasks_v0.1.md`

Purpose:

* Combines development strategy, implementation tracking, completed work, and todo management.
* Converts the specification into executable development steps.
* Records verification performed during the version.

Editing rule:

* Update this file as work progresses.
* Keep it synchronized with the matching spec version.

## App Source

Planned initial structure:

```text
src/
  models/
    itinerary.ts
  data/
    japan_trip_june_2026.ts
  screens/
    ItineraryDayScreen.tsx
    EventDetailScreen.tsx
  components/
    itinerary/
      DayItineraryView.tsx
      ItineraryItemCard.tsx
      TodoList.tsx
      TodoItemRow.tsx
      cards/
        FlightCard.tsx
        HotelCard.tsx
        ShinkansenCard.tsx
        TrainCard.tsx
        TaxiCard.tsx
        RestaurantCard.tsx
        ActivityCard.tsx
        ShoppingCard.tsx
        FreeTimeCard.tsx
        NoteCard.tsx
  utils/
    itineraryUtils.ts
App.tsx
```

Purpose:

* Contains the Expo React Native application.
* Keeps hardcoded trip data and simple TypeScript models local for `v0.1`.

Editing rule:

* Follow this structure unless Expo scaffolding establishes a better local convention.
* Keep structural decisions here, not in the product specification.

## Data Model Implementation Notes

These are implementation notes for the TypeScript app. They should support the product requirements in `TravelBuddy_Project_Spec_v0.1.md` without becoming independent product scope.

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

Version: `v0.1`

Matching specification: `TravelBuddy_Project_Spec_v0.1.md`

Current status: Planning / Initial Architecture

In scope:

* React Native app using Expo and TypeScript.
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
* Refine `TravelBuddy_Project_Spec_v0.1.md` only when the discovered detail changes product requirements.
* Refine TypeScript models and implementation notes in this file as data requirements become clearer.
* Avoid over-modeling before the first real itinerary data pass.

## Phase 1: Project Scaffold

Goal:

* Establish a minimal Expo + React Native + TypeScript app that runs on Expo Web.

Tasks:

* `[ ]` Scaffold Expo app.
* `[ ]` Confirm TypeScript configuration.
* `[ ]` Confirm Expo Web startup path.
* `[ ]` Establish only the source folders needed for the initial `DayItineraryView`.
* `[ ]` Add narrow verification commands to this file once scripts exist.

## Phase 2: Initial DayItineraryView UI

Goal:

* Render the first useful per-day itinerary view with minimum effort.

Tasks:

* `[ ]` Create `DayItineraryView`.
* `[ ]` Render day progress label, such as `Day 1 / 5`.
* `[ ]` Render a date heading.
* `[ ]` Render previous day and next day controls.
* `[ ]` Render a simple vertical list of itinerary events.
* `[ ]` Render basic time and location fields.
* `[ ]` Render flight number when the event is a flight.
* `[ ]` Do not show price/cost in `DayItineraryView`.
* `[ ]` Support pre-trip day labels for preparation tasks.
* `[ ]` Use lightweight placeholder/sample data only if user-provided data is not available yet.
* `[ ]` Keep styling simple but readable on Expo Web.
* `[ ]` Defer advanced timeline positioning until the basic day view is useful.

## Phase 3: User Data Intake And Model Refinement

Goal:

* Use real trip data from the user to refine fields, models, and display needs.

Tasks:

* `[ ]` Add user-provided itinerary data into hardcoded TypeScript data files.
* `[ ]` Identify fields needed by actual flight, hotel, restaurant, activity, train, taxi, shopping, free time, and note entries.
* `[ ]` Identify pre-trip preparation days and tasks from user-provided data.
* `[ ]` Refine itinerary/event models based on real data.
* `[ ]` Refine cost model based on real expenses and budgets.
* `[ ]` Refine contact information model based on real bookings and venues.
* `[ ]` Refine todo item model based on actual travel preparation needs.
* `[ ]` Update `TravelBuddy_Project_Spec_v0.1.md` only when product requirements change.

## Phase 4: Itinerary Navigation

Goal:

* Build the main per-day itinerary workflow.

Tasks:

* `[ ]` Create daily itinerary screen.
* `[ ]` Show day progress label.
* `[ ]` Add previous day navigation.
* `[ ]` Add next day navigation.
* `[ ]` Show current date.
* `[ ]` Render events for the selected day.

## Phase 5: Timeline Layout

Goal:

* Present events in a readable time-based day layout.

Tasks:

* `[ ]` Render hour timeline.
* `[ ]` Position events by start time.
* `[ ]` Represent event duration.
* `[ ]` Support vertical scrolling.
* `[ ]` Keep layout usable in Expo Web.
* `[ ]` Avoid web-only APIs unless isolated.

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

* `[ ]` Open event detail view from an itinerary event.
* `[ ]` Display event information.
* `[ ]` Display cost information when present.
* `[ ]` Display contact information when present.
* `[ ]` Display todo list when present.
* `[ ]` Display notes when present.

## Phase 8: Todo Display

Goal:

* Render event checklist items clearly.

Tasks:

* `[ ]` Create todo list component.
* `[ ]` Create todo item row component.
* `[ ]` Show completed state.
* `[ ]` Show priority when present.
* `[ ]` Show due date/time when present.
* `[ ]` Keep todos display-only for `v0.1`.

## Phase 9: Cost Utilities And Detail Display

Goal:

* Track costs without showing price in the initial `DayItineraryView`.

Tasks:

* `[ ]` Add itinerary utility functions.
* `[ ]` Preserve optional cost fields in data models.
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

---

# Active Work

* `[~]` Planning initial implementation from `TravelBuddy_Project_Spec_v0.1.md`.

---

# Todo Backlog

## High Priority

* `[ ]` Scaffold the Expo TypeScript app.
* `[ ]` Create only the initial source folders needed by `DayItineraryView`.
* `[ ]` Render the first minimum-effort `DayItineraryView`.
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
* `[ ]` Prepare version-up notes for `v0.2`.

---

# Verification Log

No code verification has been run yet because the app has not been scaffolded.

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

* Create the next spec file, for example `TravelBuddy_Project_Spec_v0.2.md`.
* Create the matching task file, for example `tasks_v0.2.md`.
* Carry forward incomplete tasks only if they still match the new spec.
* Move completed version history into the completed section or a concise changelog.
* Keep `TravelBuddy_Project_Spec_v*.md` as the source of truth for each matching `tasks_v*.md`.
