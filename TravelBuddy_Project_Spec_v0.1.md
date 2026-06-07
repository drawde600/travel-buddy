# Travel Buddy - Project Specification v0.1

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

No backend, database, or cloud services are required for v0.1.

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

## Out of Scope (v0.1)

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

Implementation-level folder structure and component breakdown should be tracked in `tasks_v0.1.md`.

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

Examples:

* International flight
* Domestic flight

## Hotel

Examples:

* Hotel stay
* Check-in
* Check-out

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

Selecting an event opens details.

Event Detail View displays:

* Event information
* Cost information
* Contact information
* Todo list
* Notes

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

Travel Buddy v0.1
Status: Planning / Initial Architecture
Technology: React Native + Expo + TypeScript
Data Storage: Hardcoded TypeScript
Backend: None
Database: None
