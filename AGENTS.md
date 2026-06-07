# Travel Buddy Agent Notes

## Project Scope

Travel Buddy is a personal travel planning app for a Japan June 2026 trip.

Current target:
- React Native
- Expo
- TypeScript
- Expo Web first, then iOS and Android

Version `v0.1` is intentionally local-only:
- No backend
- No database
- No authentication
- No cloud sync
- Trip data hardcoded in TypeScript files

## Expected Structure

Follow the structure from `TravelBuddy_Project_Spec_v0.1.md` unless the app scaffolding establishes a better local convention:

```text
src/
  models/
  data/
  screens/
  components/
    itinerary/
    itinerary/cards/
  utils/
App.tsx
```

## Implementation Guidance

- Prefer simple TypeScript models for itinerary, event, cost, contact, and todo data.
- Keep event card components focused by event type.
- Keep hardcoded trip data easy to edit by hand.
- Avoid adding persistence, backend calls, or external calendar libraries for `v0.1`.
- Optimize first for Expo Web usability, while avoiding web-only APIs unless isolated.
- Use existing project patterns once the Expo app is scaffolded.

## Verification

When code exists, run the narrowest relevant checks available, such as:
- TypeScript typecheck
- Expo or React Native lint/test scripts if present
- Basic browser/mobile smoke test for itinerary navigation and event details

## Source Of Truth

The current product specification is:

- `TravelBuddy_Project_Spec_v0.1.md`
