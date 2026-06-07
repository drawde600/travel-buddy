import { useMemo, useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { TouchableOpacity } from "react-native";
import { SIMULATED_CURRENT_LOCATION, SIMULATED_CURRENT_DATE, SIMULATED_CURRENT_TIME } from "../../config/simulation";

// VERSION: Increment this number when making code changes to verify deployment
const VERSION = "2.1.0";

type LocationCoords = {
  latitude: number;
  longitude: number;
};

import { ItineraryEvent, Trip } from "../../models/itinerary";
import {
  getDayDisplayLabel,
  sortEventsByTime
} from "../../utils/itineraryUtils";

type TimelineSegment = {
  type: "event" | "empty";
  startTime: string;
  endTime: string;
  event?: ItineraryEvent;
};

function generateTimelineSegments(events: ItineraryEvent[]): TimelineSegment[] {
  const segments: TimelineSegment[] = [];

  // Separate events with and without times
  const eventsWithTime = sortEventsByTime(events).filter(e => {
    // Events with explicit startTime
    if (e.startTime) return true;
    // Airport trains use targetTrain.time
    if (e.type === "airportTrain" && e.targetTrain) return true;
    return false;
  });

  const eventsWithoutTime = sortEventsByTime(events).filter(e => {
    // No time and not an airport train
    if (!e.startTime && e.type !== "airportTrain") return true;
    return false;
  });

  // Add events without times at the top
  for (const event of eventsWithoutTime) {
    segments.push({
      type: "event",
      startTime: "",
      endTime: "",
      event: event
    });
  }

  // Start timeline from 00:00 for events with times
  let currentTime = "00:00";

  for (const event of eventsWithTime) {
    // For airport trains, use target train time
    let startTime: string;
    let endTime: string;

    if (event.type === "airportTrain" && event.targetTrain) {
      startTime = event.targetTrain.time;
      endTime = event.targetTrain.arrivalTime || "23:59";
    } else {
      startTime = event.startTime!;
      endTime = event.endTime || "23:59";
    }

    // Add empty segment if there's a gap
    if (currentTime < startTime) {
      segments.push({
        type: "empty",
        startTime: currentTime,
        endTime: startTime
      });
    }

    // Add event segment
    segments.push({
      type: "event",
      startTime: startTime,
      endTime: endTime,
      event: event
    });

    // Move current time to end of this event
    currentTime = endTime;
  }

  // Add final empty segment if there's time remaining until 24:00
  if (currentTime < "24:00") {
    segments.push({
      type: "empty",
      startTime: currentTime,
      endTime: "24:00"
    });
  }

  return segments;
}

type DayItineraryViewProps = {
  trip: Trip;
};

export function DayItineraryView({ trip }: DayItineraryViewProps) {
  // Find initial day index based on simulated date
  const getInitialDayIndex = (): number => {
    if (SIMULATED_CURRENT_DATE) {
      const matchingIndex = trip.days.findIndex(day => day.date === SIMULATED_CURRENT_DATE);
      if (matchingIndex >= 0) {
        console.log(`[v${VERSION}] Opening on simulated date: ${SIMULATED_CURRENT_DATE} (day ${matchingIndex + 1})`);
        return matchingIndex;
      }
    }
    console.log(`[v${VERSION}] Opening on first day (no simulated date match)`);
    return 0;
  };

  const [selectedDayIndex, setSelectedDayIndex] = useState(getInitialDayIndex);
  const [selectedEvent, setSelectedEvent] = useState<ItineraryEvent | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
  const selectedDay = trip.days[selectedDayIndex];

  const segments = useMemo(
    () => generateTimelineSegments(selectedDay.events),
    [selectedDay.events]
  );

  // Use simulated location from config for testing
  useEffect(() => {
    console.log(`[v${VERSION}] Setting up simulation:`, {
      location: SIMULATED_CURRENT_LOCATION,
      time: SIMULATED_CURRENT_TIME
    });
    setCurrentLocation(SIMULATED_CURRENT_LOCATION);
  }, []);

  const canGoPrevious = selectedDayIndex > 0;
  const canGoNext = selectedDayIndex < trip.days.length - 1;

  function goPrevious() {
    if (canGoPrevious) {
      setSelectedDayIndex((current) => current - 1);
    }
  }

  function goNext() {
    if (canGoNext) {
      setSelectedDayIndex((current) => current + 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayLabel}>{getDayDisplayLabel(selectedDay)}</Text>
            {selectedDay.date ? (
              <Text style={styles.dateText}>{selectedDay.date}</Text>
            ) : null}
            <Text style={styles.versionText}>v{VERSION}</Text>
          </View>

          <View style={styles.navRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous day"
              disabled={!canGoPrevious}
              onPress={goPrevious}
              style={({ pressed }) => [
                styles.arrowButton,
                !canGoPrevious && styles.arrowButtonDisabled,
                pressed && canGoPrevious && styles.arrowButtonPressed
              ]}
            >
              <Text
                style={[
                  styles.arrowText,
                  !canGoPrevious && styles.arrowTextDisabled
                ]}
              >
                ←
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next day"
              disabled={!canGoNext}
              onPress={goNext}
              style={({ pressed }) => [
                styles.arrowButton,
                !canGoNext && styles.arrowButtonDisabled,
                pressed && canGoNext && styles.arrowButtonPressed
              ]}
            >
              <Text
                style={[
                  styles.arrowText,
                  !canGoNext && styles.arrowTextDisabled
                ]}
              >
                →
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.eventList}>
        {segments.map((segment, index) => (
          <TimelineSegmentRow
            key={index}
            segment={segment}
            currentLocation={currentLocation}
            onPress={(event) => {
              // Open detail modal for events with relevant info
              if (event.type === "airportTrain" ||
                  event.locationInfo?.latitude ||
                  event.locationInfo?.longitude ||
                  event.notes ||
                  event.flightNumber) {
                setSelectedEvent(event);
              }
            }}
          />
        ))}
      </ScrollView>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </View>
  );
}

type TimelineSegmentRowProps = {
  segment: TimelineSegment;
  currentLocation: LocationCoords | null;
  onPress?: (event: ItineraryEvent) => void;
};

// Helper function to check if event is upcoming
function isEventUpcoming(event: ItineraryEvent): boolean {
  // Get event start time - different fields for different event types
  let eventStartTime: string | undefined = event.startTime;
  if (event.type === "airportTrain" && event.targetTrain?.time) {
    eventStartTime = event.targetTrain.time;
  }

  if (!eventStartTime) return false;

  // Use simulated time if provided, otherwise use current time
  let nowHours: number;
  let nowMinutes: number;

  if (SIMULATED_CURRENT_TIME && SIMULATED_CURRENT_TIME.length > 0) {
    [nowHours, nowMinutes] = SIMULATED_CURRENT_TIME.split(':').map(Number);
  } else {
    const now = new Date();
    nowHours = now.getHours();
    nowMinutes = now.getMinutes();
  }

  const [eventHours, eventMinutes] = eventStartTime.split(':').map(Number);

  // Convert to minutes for easy comparison
  const nowTotalMinutes = nowHours * 60 + nowMinutes;
  const eventTotalMinutes = eventHours * 60 + eventMinutes;

  const isUpcoming = eventTotalMinutes > nowTotalMinutes;
  console.log(`[v${VERSION}] Event ${event.title} time check:`, {
    eventStart: eventStartTime,
    simulatedTime: SIMULATED_CURRENT_TIME || "actual",
    nowMinutes: nowTotalMinutes,
    eventMinutes: eventTotalMinutes,
    isUpcoming
  });

  return isUpcoming;
}

// Calculate distance between two GPS coordinates using Haversine formula
function calculateDistance(from: LocationCoords, to: LocationCoords): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Format distance in km or meters
function formatDistance(km: number): string {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters}m`;
  }
  return `${km.toFixed(1)}km`;
}

function TimelineSegmentRow({ segment, currentLocation, onPress }: TimelineSegmentRowProps) {
  const hasTime = segment.startTime !== "";
  const isUpcoming = segment.event && isEventUpcoming(segment.event);

  // Get event-specific colors
  const eventColor = segment.event ? getEventColor(segment.event.type) : "#dce3ef";
  const eventBgColor = segment.event ? getEventBackgroundColor(segment.event.type) : "#ffffff";

  // Calculate distance only for events with GPS coordinates that haven't passed
  const distance = useMemo(() => {
    // Get GPS coordinates - different fields for different event types
    let eventLatitude: number | undefined;
    let eventLongitude: number | undefined;

    if (segment.event?.locationInfo?.latitude && segment.event?.locationInfo?.longitude) {
      // Standard location in locationInfo
      eventLatitude = segment.event.locationInfo.latitude;
      eventLongitude = segment.event.locationInfo.longitude;
    } else if (segment.event?.type === "airportTrain" && segment.event?.targetTrain?.destinationLocation?.latitude) {
      // Airport trains store GPS in targetTrain.destinationLocation
      eventLatitude = segment.event.targetTrain.destinationLocation.latitude;
      eventLongitude = segment.event.targetTrain.destinationLocation.longitude;
    }

    console.log(`[v${VERSION}] Distance calc for ${segment.event?.title}:`, {
      hasCurrentLocation: !!currentLocation,
      eventLatitude,
      eventLongitude,
      isUpcoming,
      eventType: segment.event?.type
    });

    if (!currentLocation || !eventLatitude || !eventLongitude || !isUpcoming) {
      console.log(`[v${VERSION}] ❌ Distance skipped for ${segment.event?.title}`);
      return null;
    }

    const calculatedDistance = calculateDistance(
      currentLocation,
      {
        latitude: eventLatitude,
        longitude: eventLongitude
      }
    );
    console.log(`[v${VERSION}] ✓ Distance calculated for ${segment.event?.title}: ${calculatedDistance.toFixed(1)}km`);
    return calculatedDistance;
  }, [currentLocation, segment.event, isUpcoming]);

  const distanceText = distance ? formatDistance(distance) : null;
  console.log(`[v${VERSION}] Final distance text for ${segment.event?.title}: "${distanceText}"`);

  if (segment.type === "empty") {
    return (
      <View style={styles.segmentRow}>
        <View style={styles.timeColumn}>
          <Text style={styles.emptyStartTime}>{segment.startTime}</Text>
          <Text style={styles.emptyEndTime}>{segment.endTime}</Text>
        </View>
        <View style={styles.emptySegmentCard}>
          <Text style={styles.emptyLabel}>• • •</Text>
        </View>
      </View>
    );
  }

  if (!hasTime) {
    return (
      <View style={styles.segmentRow}>
        <View style={styles.timeColumn}>
          <Text style={styles.blankTime}> </Text>
          <Text style={styles.blankTime}> </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.eventCard,
            { backgroundColor: eventBgColor, borderColor: eventColor },
            pressed && styles.eventCardPressed
          ]}
          onPress={() => segment.event && onPress?.(segment.event)}
        >
          <EventCardContent event={segment.event!} showDistance={!!isUpcoming && !!distanceText} distanceText={distanceText} />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.segmentRow}>
      <View style={styles.timeColumn}>
        <Text style={styles.startTimeText}>{segment.startTime}</Text>
        <Text style={styles.endTimeText}>{segment.endTime}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.eventCard,
          { backgroundColor: eventBgColor, borderColor: eventColor },
          pressed && styles.eventCardPressed
        ]}
        onPress={() => segment.event && onPress?.(segment.event)}
      >
        <EventCardContent event={segment.event!} showDistance={!!isUpcoming && !!distanceText} distanceText={distanceText} />
      </Pressable>
    </View>
  );
}

type EventCardContentProps = {
  event: ItineraryEvent;
  showDistance?: boolean;
  distanceText?: string | null;
};

function EventCardContent({ event, showDistance, distanceText }: EventCardContentProps) {
  const hasFlightNumber = event.type === "flight" && event.flightNumber;
  const hasTodos = event.todos && event.todos.length > 0;
  const hasLocation = !!event.location;

  const eventIcon = getEventIcon(event.type);

  // For hotels, show simplified format: "Check-in Hotel Name"
  if (event.type === "hotel") {
    const actionLabel = event.notes?.toLowerCase().includes("check-in") ? "Check-in" :
                         event.notes?.toLowerCase().includes("check-out") ? "Check-out" : "";
    const simplifiedTitle = actionLabel ? `${actionLabel} ${event.title}` : event.title;

    return (
      <>
        <View style={styles.cardRow}>
          <Text style={styles.eventTitle}>{simplifiedTitle}</Text>
          <View style={styles.iconRow}>
            <Text style={styles.eventIcon}>{eventIcon}</Text>
          </View>
        </View>

        {showDistance && distanceText ? (
          <View style={styles.secondRow}>
            <Text style={styles.distanceText}>{distanceText}</Text>
          </View>
        ) : null}
      </>
    );
  }

  // For airport trains, show target train time range in subtitle
  const isAirportTrain = event.type === "airportTrain";
  const airportTrainSubtitle = isAirportTrain && event.targetTrain
    ? `${event.targetTrain.time}${event.targetTrain.arrivalTime ? `-${event.targetTrain.arrivalTime}` : ""}`
    : null;

  // Build second row content
  const secondRowParts = [];
  if (event.location) secondRowParts.push(event.location);
  if (hasFlightNumber) secondRowParts.push(event.flightNumber);
  const hasSecondRow = secondRowParts.length > 0 || event.notes;

  return (
    <>
      <View style={styles.cardRow}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.iconRow}>
          <Text style={styles.eventIcon}>{eventIcon}</Text>
          {hasLocation ? <Text style={styles.metaIcon}>📍</Text> : null}
          {hasTodos ? <Text style={styles.metaIcon}>✓</Text> : null}
        </View>
      </View>

      {(hasSecondRow || showDistance) ? (
        <View style={styles.secondRow}>
          {showDistance && distanceText ? (
            <Text style={styles.distanceText}>{distanceText}</Text>
          ) : null}
          {hasSecondRow ? (
            <>
              <Text style={styles.secondRowText}>
                {secondRowParts.join(" • ")}
              </Text>
              {event.notes ? (
                <Text style={styles.notesText}>{event.notes}</Text>
              ) : null}
            </>
          ) : null}
        </View>
      ) : null}
    </>
  );
}

function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    flight: "✈️",
    hotel: "🏨",
    shinkansen: "🚄",
    train: "🚆",
    airportTrain: "🚅",
    taxi: "🚕",
    restaurant: "🍽️",
    activity: "🎯",
    shopping: "🛍️",
    freeTime: "🚶",
    note: "📝",
    todo: "📋"
  };
  return icons[type] || "📍";
}

function getEventColor(type: string): string {
  const colors: Record<string, string> = {
    flight: "#3b82f6",      // Blue
    hotel: "#8b5cf6",       // Purple
    shinkansen: "#ef4444",  // Red
    train: "#06b6d4",       // Cyan
    airportTrain: "#f59e0b", // Amber
    taxi: "#f97316",        // Orange
    restaurant: "#059669",  // Green
    activity: "#ec4899",    // Pink
    shopping: "#fbbf24",    // Yellow
    freeTime: "#94a3b8",    // Slate gray
    note: "#6b7280",        // Gray
    todo: "#84cc16"         // Lime
  };
  return colors[type] || "#dce3ef"; // Default border color
}

function getEventBackgroundColor(type: string): string {
  const colors: Record<string, string> = {
    flight: "#eff6ff",      // Light blue
    hotel: "#f5f3ff",       // Light purple
    shinkansen: "#fef2f2",  // Light red
    train: "#ecfeff",       // Light cyan
    airportTrain: "#fef3c7", // Light amber
    taxi: "#ffedd5",        // Light orange
    restaurant: "#ecfdf5",  // Light green
    activity: "#fdf2f8",    // Light pink
    shopping: "#fefce8",    // Light yellow
    freeTime: "#f1f5f9",    // Light slate
    note: "#f3f4f6",        // Light gray
    todo: "#f7fee7"         // Light lime
  };
  return colors[type] || "#ffffff"; // Default white
}

type EventDetailModalProps = {
  event: ItineraryEvent;
  onClose: () => void;
};

function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{event.title}</Text>
            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close details"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.modalScroll}>
            {/* GPS Location Button for any event with coordinates */}
            {event.locationInfo?.latitude && event.locationInfo.longitude && (
              <View style={styles.mapButtonRow}>
                <GoogleMapsButton
                  latitude={event.locationInfo.latitude}
                  longitude={event.locationInfo.longitude}
                  name={event.locationInfo.name}
                />
              </View>
            )}

            {/* Address Display Button for hotels with dual-language addresses */}
            {event.type === "hotel" && event.locationInfo?.addressJa && (
              <View style={styles.mapButtonRow}>
                <AddressDisplayButton
                  locationInfo={event.locationInfo}
                />
              </View>
            )}

            {/* Website Button for events with websites */}
            {event.locationInfo?.website && (
              <View style={styles.mapButtonRow}>
                <WebsiteButton
                  url={event.locationInfo.website}
                  name={event.locationInfo.name}
                />
              </View>
            )}

            {/* Event-specific content */}
            {event.type === "airportTrain" ? (
              <>
                {event.notes && (
                  <Text style={styles.modalNotes}>{event.notes}</Text>
                )}

                {event.targetTrain?.destinationLocation && (
                  <View style={styles.mapButtonRow}>
                    <GoogleMapsButton
                      latitude={event.targetTrain.destinationLocation.latitude}
                      longitude={event.targetTrain.destinationLocation.longitude}
                      name={event.targetTrain.destinationLocation.name}
                    />
                  </View>
                )}

                {event.targetTrain && (
                  <View style={styles.trainSection}>
                    <Text style={styles.sectionTitle}>🎯 Target Train</Text>
                    <TrainOptionCard option={event.targetTrain} isTarget={true} />
                  </View>
                )}

                {event.backupTrains && event.backupTrains.length > 0 && (
                  <View style={styles.trainSection}>
                    <Text style={styles.sectionTitle}>✅ Backup Options</Text>
                    {event.backupTrains.map((train, index) => (
                      <TrainOptionCard key={index} option={train} isTarget={false} />
                    ))}
                  </View>
                )}

                {event.avoidTrains && event.avoidTrains.length > 0 && (
                  <View style={styles.trainSection}>
                    <Text style={styles.sectionTitle}>❌ Trains to Avoid</Text>
                    {event.avoidTrains.map((train, index) => (
                      <TrainOptionCard key={index} option={train} isAvoid={true} />
                    ))}
                  </View>
                )}
              </>
            ) : (
              <>
                {/* General event details */}
                {event.startTime && (
                  <Text style={styles.eventDetailText}>
                    ⏰ {event.startTime}{event.endTime ? ` - ${event.endTime}` : ""}
                  </Text>
                )}
                {event.location && (
                  <Text style={styles.eventDetailText}>
                    📍 {event.location}
                  </Text>
                )}
                {event.flightNumber && (
                  <Text style={styles.eventDetailText}>
                    ✈️ {event.flightNumber}
                  </Text>
                )}
                {event.notes && (
                  <Text style={styles.eventDetailText}>
                    📝 {event.notes}
                  </Text>
                )}
                {event.locationInfo?.address && (
                  <Text style={styles.eventDetailText}>
                    🏠 {event.locationInfo.address}
                  </Text>
                )}
                {event.locationInfo?.phone && (
                  <Text style={styles.eventDetailText}>
                    📞 {event.locationInfo.phone}
                  </Text>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

type TrainOptionCardProps = {
  option: import("../../models/itinerary").AirportTrainOption;
  isTarget?: boolean;
  isAvoid?: boolean;
};

function TrainOptionCard({ option, isTarget, isAvoid }: TrainOptionCardProps) {
  // Format time display as "5:26 AM-6:09 AM" if arrival time available
  const timeDisplay = option.arrivalTime
    ? `${option.time}-${option.arrivalTime}`
    : `${option.time} (no arrival data)`;

  return (
    <View style={[
      styles.trainOptionCard,
      isTarget && styles.targetTrainCard,
      isAvoid && styles.avoidTrainCard
    ]}>
      <View style={styles.trainTimeRow}>
        <Text style={[
          styles.trainTime,
          isTarget && styles.targetTrainTime
        ]}>{timeDisplay}</Text>
        {isTarget && <Text style={styles.targetBadge}>TARGET</Text>}
        {isAvoid && <Text style={styles.avoidBadge}>AVOID</Text>}
      </View>

      <Text style={styles.trainName}>{option.name}</Text>
      <Text style={styles.trainNameJa}>{option.nameJa}</Text>

      <View style={styles.trainDestinationRow}>
        <Text style={styles.trainDestination}>To: {option.destination}</Text>
        {option.destinationJa && (
          <Text style={styles.trainDestinationJa}>（{option.destinationJa}）</Text>
        )}
      </View>
    </View>
  );
}

type GoogleMapsButtonProps = {
  latitude?: number;
  longitude?: number;
  name: string;
};

function GoogleMapsButton({ latitude, longitude, name }: GoogleMapsButtonProps) {
  if (!latitude || !longitude) {
    return null;
  }

  const googleMapsUrl = `https://www.google.com/maps/@${latitude},${longitude},17z`;

  const handleOpenMaps = () => {
    // Open in new tab for web, would use different APIs for mobile
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <TouchableOpacity
      onPress={handleOpenMaps}
      style={styles.mapButton}
      accessibilityRole="button"
      accessibilityLabel={`Open ${name} in Google Maps`}
    >
      <Text style={styles.mapButtonText}>📍 Open in Google Maps</Text>
    </TouchableOpacity>
  );
}

type AddressDisplayModalProps = {
  locationInfo: import("../../models/itinerary").Location;
  onClose: () => void;
};

function AddressDisplayModal({ locationInfo, onClose }: AddressDisplayModalProps) {
  const [showJapanese, setShowJapanese] = useState(false);

  const displayName = showJapanese ? (locationInfo.nameJa || locationInfo.name) : locationInfo.name;
  const displayAddress = showJapanese ? (locationInfo.addressJa || locationInfo.address) : locationInfo.address;

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.addressModalContainer}>
        {/* Minimal Header */}
        <View style={styles.addressModalHeader}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.addressBackButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.addressBackButtonText}>← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowJapanese(!showJapanese)}
            style={styles.languageToggleButton}
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${showJapanese ? "English" : "Japanese"}`}
          >
            <Text style={styles.languageToggleText}>
              {showJapanese ? "🇺🇸 English" : "🇯🇵 日本語"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Address Content - Minimal and Clear */}
        <View style={styles.addressContent}>
          <View style={styles.addressCard}>
            <Text style={styles.addressTitle}>{displayName}</Text>
            <Text style={styles.addressText}>{displayAddress}</Text>
            {locationInfo.phone && (
              <Text style={styles.addressPhone}>{locationInfo.phone}</Text>
            )}
          </View>

          <Text style={styles.addressInstructions}>
            Show this screen to taxi drivers or police
          </Text>
        </View>
      </View>
    </Modal>
  );
}

type AddressDisplayButtonProps = {
  locationInfo: import("../../models/itinerary").Location;
};

function AddressDisplayButton({ locationInfo }: AddressDisplayButtonProps) {
  const [showAddressModal, setShowAddressModal] = useState(false);

  if (!locationInfo.address || !locationInfo.addressJa) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowAddressModal(true)}
        style={styles.addressButton}
        accessibilityRole="button"
        accessibilityLabel="Show full address display"
      >
        <Text style={styles.addressButtonText}>🏨 Show Address Card</Text>
      </TouchableOpacity>

      {showAddressModal && (
        <AddressDisplayModal
          locationInfo={locationInfo}
          onClose={() => setShowAddressModal(false)}
        />
      )}
    </>
  );
}

type WebsiteButtonProps = {
  url: string;
  name: string;
};

function WebsiteButton({ url, name }: WebsiteButtonProps) {
  const handleOpenWebsite = () => {
    window.open(url, '_blank');
  };

  return (
    <TouchableOpacity
      onPress={handleOpenWebsite}
      style={styles.websiteButton}
      accessibilityRole="button"
      accessibilityLabel={`Open ${name} website`}
    >
      <Text style={styles.websiteButtonText}>🌐 Visit Website</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 920,
    paddingHorizontal: 16,
    paddingVertical: 18
  },
  header: {
    gap: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderColor: "#dce3ef",
    borderWidth: 1
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dayInfo: {
    gap: 2
  },
  dayLabel: {
    color: "#14213d",
    fontSize: 16,
    fontWeight: "800"
  },
  dateText: {
    color: "#667085",
    fontSize: 14
  },
  versionText: {
    color: "#b3b3b3",
    fontSize: 11,
    marginTop: 2
  },
  navRow: {
    flexDirection: "row",
    gap: 8
  },
  arrowButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#1f6feb"
  },
  arrowButtonPressed: {
    backgroundColor: "#1a5fc7"
  },
  arrowButtonDisabled: {
    backgroundColor: "#d8dee9"
  },
  arrowText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700"
  },
  arrowTextDisabled: {
    color: "#7c8796"
  },
  eventList: {
    gap: 4,
    paddingVertical: 16
  },
  segmentRow: {
    flexDirection: "row",
    gap: 10
  },
  emptySegmentCard: {
    flex: 1,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#f8fafc",
    borderColor: "#e8eef5",
    borderWidth: 1
  },
  emptyLabel: {
    color: "#bdc3c7",
    fontSize: 11,
    letterSpacing: 2
  },
  emptyStartTime: {
    color: "#d8dee9",
    fontSize: 11,
    fontWeight: "600"
  },
  emptyEndTime: {
    color: "#e8eef5",
    fontSize: 10,
    fontWeight: "500"
  },
  blankTime: {
    color: "transparent",
    fontSize: 12,
    fontWeight: "700"
  },
  timeColumn: {
    width: 80,
    paddingTop: 8,
    gap: 2
  },
  startTimeText: {
    color: "#344054",
    fontSize: 12,
    fontWeight: "700"
  },
  endTimeText: {
    color: "#667085",
    fontSize: 11,
    fontWeight: "600"
  },
  eventCard: {
    flex: 1,
    gap: 4,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderColor: "#dce3ef",
    borderWidth: 1,
    padding: 8
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  eventTitle: {
    color: "#14213d",
    fontSize: 14,
    fontWeight: "700",
    flex: 1
  },
  iconRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center"
  },
  eventIcon: {
    fontSize: 14
  },
  flightNumber: {
    color: "#0f5132",
    fontSize: 11,
    fontWeight: "700"
  },
  metaIcon: {
    fontSize: 10
  },
  secondRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  airportTrainTime: {
    color: "#1f6feb",
    fontSize: 12,
    fontWeight: "700"
  },
  secondRowText: {
    color: "#344054",
    fontSize: 11,
    flex: 1
  },
  notesText: {
    color: "#667085",
    fontSize: 10,
    fontStyle: "italic"
  },
  distanceText: {
    color: "#059669",
    fontSize: 11,
    fontWeight: "600"
  },
  eventCardPressed: {
    backgroundColor: "#f0f4f8"
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    maxWidth: 600,
    width: "100%",
    maxHeight: "80%",
    overflow: "hidden"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dce3ef"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#14213d"
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dce3ef",
    justifyContent: "center",
    alignItems: "center"
  },
  closeButtonText: {
    fontSize: 18,
    color: "#344054"
  },
  modalScroll: {
    padding: 16
  },
  modalNotes: {
    fontSize: 13,
    color: "#667085",
    fontStyle: "italic",
    marginBottom: 16,
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 8
  },
  mapButtonRow: {
    marginBottom: 16
  },
  mapButton: {
    backgroundColor: "#4285f4",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center"
  },
  mapButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },
  trainSection: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14213d",
    marginBottom: 12
  },
  trainOptionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dce3ef",
    padding: 12,
    marginBottom: 8
  },
  targetTrainCard: {
    backgroundColor: "#f0f9ff",
    borderColor: "#1f6feb",
    borderWidth: 2
  },
  avoidTrainCard: {
    backgroundColor: "#fef2f2",
    borderColor: "#ef4444",
    opacity: 0.7
  },
  trainTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  trainTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "#344054"
  },
  targetTrainTime: {
    fontSize: 16,
    color: "#1f6feb"
  },
  targetBadge: {
    backgroundColor: "#1f6feb",
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  avoidBadge: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  trainName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#14213d",
    marginBottom: 2
  },
  trainNameJa: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14213d",
    marginBottom: 6
  },
  trainDestinationRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  trainDestination: {
    fontSize: 13,
    color: "#344054"
  },
  trainDestinationJa: {
    fontSize: 13,
    color: "#667085",
    marginLeft: 4
  },
  eventDetailText: {
    fontSize: 15,
    color: "#344054",
    marginBottom: 8,
    lineHeight: 22
  },
  addressButton: {
    backgroundColor: "#ea580c",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center"
  },
  addressButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },
  websiteButton: {
    backgroundColor: "#059669",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center"
  },
  websiteButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },
  // Full-screen address modal styles
  addressModalContainer: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  addressModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dce3ef"
  },
  addressBackButton: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  addressBackButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f6feb"
  },
  languageToggleButton: {
    backgroundColor: "#1f6feb",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  languageToggleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff"
  },
  addressContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  addressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 32,
    width: "100%",
    maxWidth: 600,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  addressTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#14213d",
    textAlign: "center",
    marginBottom: 24
  },
  addressText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#14213d",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 8
  },
  addressPhone: {
    fontSize: 18,
    fontWeight: "600",
    color: "#059669",
    textAlign: "center",
    marginTop: 16
  },
  addressInstructions: {
    fontSize: 18,
    color: "#667085",
    textAlign: "center",
    marginTop: 24,
    fontStyle: "italic"
  }
});
