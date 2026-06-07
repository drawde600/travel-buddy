import { ItineraryEvent, TripDay } from "../models/itinerary";

export function getDayDisplayLabel(day: TripDay): string {
  if (day.dayLabel) {
    return day.dayLabel;
  }

  if (day.dayNumber && day.totalTripDays) {
    return `Day ${day.dayNumber} / ${day.totalTripDays}`;
  }

  if (day.isPreTrip) {
    return "Pre-trip";
  }

  return "Trip day";
}

export function getEventTimeLabel(event: ItineraryEvent): string {
  // For airport trains, use target train time range
  if (event.type === "airportTrain" && event.targetTrain) {
    const { time, arrivalTime } = event.targetTrain;
    return arrivalTime ? `${time}-${arrivalTime}` : time;
  }

  // For regular events with both start and end time
  if (event.startTime && event.endTime) {
    return `${event.startTime} - ${event.endTime}`;
  }

  // For events with only start time
  if (event.startTime) {
    return event.startTime;
  }

  // For events without time
  return "Any time";
}

export function sortEventsByTime(events: ItineraryEvent[]): ItineraryEvent[] {
  return [...events].sort((left, right) => {
    // Get effective time for each event
    const leftTime = getEventTime(left);
    const rightTime = getEventTime(right);

    return leftTime.localeCompare(rightTime);
  });
}

function getEventTime(event: ItineraryEvent): string {
  // For airport trains, use target train time
  if (event.type === "airportTrain" && event.targetTrain) {
    return event.targetTrain.time;
  }
  // For events with explicit startTime, use it
  if (event.startTime) {
    return event.startTime;
  }
  // Events without time go last
  return "99:99";
}
