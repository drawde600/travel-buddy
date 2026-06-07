# Travel Buddy

Travel Buddy is a personal Japan June 2026 travel planning app.

Current version: `v0.2`

Current implementation target:

* React Native
* Expo SDK 54
* TypeScript
* Expo Web first
* Expo Go compatible with SDK 54

## Source Of Truth

Product scope is defined in:

* `TravelBuddy_Project_Spec_v0.2.md`

Development tasks and implementation tracking are defined in:

* `tasks_v0.2.md`

Older version artifacts are kept for history.

## Current App State

The app currently contains only the minimum scaffold for the first itinerary screen:

```text
App.tsx
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
```

Other screens and event-specific cards are intentionally deferred.

## Requirements

Install:

* Node.js
* npm
* Expo Go with SDK 54 support

## Install Dependencies

From this folder:

```powershell
npm install
```

If a previous install was interrupted, remove `node_modules` and reinstall:

```powershell
Remove-Item -LiteralPath node_modules -Recurse -Force
npm install
```

## Run On Web

```powershell
npm run web
```

This starts Expo with dependency validation disabled because the Expo SDK 54 CLI can fail during its online dependency check with `Body is unusable: Body has already been read`.

Expo will print a local web URL in the terminal. Open that URL in a browser.

## Run Expo Dev Server

```powershell
npm start
```

This starts the Expo dev server with dependency validation disabled and lets you choose a target from the Expo terminal UI.

## Typecheck

```powershell
npm run typecheck
```

This runs:

```powershell
tsc --noEmit
```

## Current Note

Dependency installation previously timed out on the network-mounted workspace and left a partial `node_modules` folder. If commands fail with missing React, React Native, or TypeScript packages, clean `node_modules` and run `npm install` again.
