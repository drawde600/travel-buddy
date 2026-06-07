import { SafeAreaView, StyleSheet } from "react-native";

import { DayItineraryView } from "./src/components/itinerary/DayItineraryView";
import { japanTripJune2026 } from "./src/data/japan_trip_june_2026";

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <DayItineraryView trip={japanTripJune2026} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#f5f7fb"
  }
});
