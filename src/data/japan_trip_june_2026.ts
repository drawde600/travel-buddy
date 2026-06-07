import { Trip } from "../models/itinerary";

export const japanTripJune2026: Trip = {
  id: "japan-june-2026",
  title: "Japan June 2026",
  days: [
    {
      id: "pre-trip",
      dayLabel: "Pre-trip",
      title: "Before Travel",
      isPreTrip: true,
      events: [
        {
          id: "pay-ph-travel-tax",
          type: "todo",
          title: "Pay PH Travel Tax",
          notes: "P3240"
        },
        {
          id: "fill-ph-etravel",
          type: "todo",
          title: "Fill up PH e-Travel form"
        },
        {
          id: "fill-japan-travel-form",
          type: "todo",
          title: "Fill up Japan Travel form"
        }
      ]
    },
    {
      id: "arrival-day",
      date: "2026-06-12",
      dayNumber: 1,
      totalTripDays: 6,
      title: "Arrival in Tokyo",
      events: [
        {
          id: "flight-jl0078-arrival",
          type: "flight",
          title: "JL0078 - Arrival",
          startTime: "04:45",
          endTime: "05:00",
          location: "HANEDA T3",
          locationInfo: {
            name: "Haneda Airport Terminal 3",
            latitude: 35.5446472,
            longitude: 139.7652128
          },
          flightNumber: "JL0078"
        },
        {
          id: "hotel-koko-asakusa",
          type: "hotel",
          title: "KOKO HOTEL Asakusa Komagata",
          startTime: "06:30",
          endTime: "06:40",
          location: "Asakusa, Tokyo",
          locationInfo: {
            name: "KOKO HOTEL Asakusa Komagata",
            nameJa: "KOKO HOTEL 浅草駒形",
            latitude: 35.7077411,
            longitude: 139.7960929,
            address: "2 Chome-7-5 Komagata, Taito City, Tokyo 111-0043, Japan",
            addressJa: "台東区駒形2-7-5, 浅草, 東京都, 日本 111-0043",
            website: "https://koko-hotels.com/asakusa_komagata/",
            phone: "+81-3-6777-1188"
          },
          notes: "Booking ID: 1731147118\nCheck-in: 6:30 AM June 12, 2026"
        },
        {
          id: "airport-train-asakusa",
          type: "airportTrain",
          title: "Airport Train to Asakusa",
          notes: "Flight JL0078 arrives 04:45 - timing depends on immigration",
          targetTrain: {
            time: "05:26",
            arrivalTime: "06:09",
            name: "Express Imbanihon-Idai",
            nameJa: "急行 印旛日本医大",
            destination: "Asakusa",
            destinationJa: "浅草",
            destinationLocation: {
              name: "Asakusa Station",
              latitude: 35.7098669,
              longitude: 139.7945926
            }
          },
          backupTrains: [
            {
              time: "05:37",
              arrivalTime: "06:20",
              name: "Rapid-Limited Express Aoto",
              nameJa: "快特 青砥",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "05:51",
              arrivalTime: "06:34",
              name: "Express Narita Airport Terminal 1",
              nameJa: "急行 成田空港第１ターミナル",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "06:11",
              arrivalTime: "06:54",
              name: "Rapid-Limited Express Aoto",
              nameJa: "快特 青砥",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "06:18",
              arrivalTime: "07:01",
              name: "Express Narita Airport Terminal 1",
              nameJa: "急行 成田空港第１ターミナル",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "06:31",
              arrivalTime: "07:14",
              name: "Rapid-Limited Express Inba-Nihon-Idai",
              nameJa: "快特 印旛日本医大",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "06:38",
              arrivalTime: "07:21",
              name: "Limited Express Narita Airport",
              nameJa: "特急 成田空港",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "06:51",
              arrivalTime: "07:34",
              name: "Rapid-Limited Express Aoto",
              nameJa: "快特 青砥",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "06:58",
              arrivalTime: "07:41",
              name: "Express Narita Airport Terminal 1",
              nameJa: "急行 成田空港第１ターミナル",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "07:11",
              arrivalTime: "07:54",
              name: "Rapid-Limited Express Aoto",
              nameJa: "快特 青砥",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            },
            {
              time: "07:18",
              arrivalTime: "08:01",
              name: "Express Narita Airport Terminal 1",
              nameJa: "急行 成田空港第１ターミナル",
              destination: "Asakusa",
              destinationJa: "浅草",
              destinationLocation: {
                name: "Asakusa Station",
                latitude: 35.7098669,
                longitude: 139.7945926
              }
            }
          ],
          avoidTrains: [
            {
              time: "06:04",
              name: "Express Sengakuji",
              nameJa: "急行 泉岳寺",
              destination: "Sengakuji",
              destinationJa: "泉岳寺"
            },
            {
              time: "06:24",
              name: "Express Sengakuji",
              nameJa: "急行 泉岳寺",
              destination: "Sengakuji",
              destinationJa: "泉岳寺"
            },
            {
              time: "06:44",
              name: "Express Sengakuji",
              nameJa: "急行 泉岳寺",
              destination: "Sengakuji",
              destinationJa: "泉岳寺"
            },
            {
              time: "07:04",
              name: "Express Sengakuji",
              nameJa: "急行 泉岳寺",
              destination: "Sengakuji",
              destinationJa: "泉岳寺"
            },
            {
              time: "07:24",
              name: "Express Sengakuji",
              nameJa: "急行 泉岳寺",
              destination: "Sengakuji",
              destinationJa: "泉岳寺"
            }
          ]
        },
        {
          id: "bus-red-segment-1",
          type: "activity",
          title: "🔴 Red Line: Tokyo Skytree → Marunouchi",
          startTime: "09:45",
          endTime: "10:45",
          location: "R4 → R1",
          locationInfo: {
            name: "Tokyo Skytree Station to Marunouchi",
            latitude: 35.7091822,
            longitude: 139.808547
          },
          notes: "Board at R4 Tokyo Skytree Station\nAlight at R1 Marunouchi Mitsubishi Building"
        },
        {
          id: "gap-marunouchi-1",
          type: "freeTime",
          title: "Free Time • Marunouchi",
          startTime: "10:45",
          endTime: "11:55",
          location: "Marunouchi Mitsubishi Building",
          locationInfo: {
            name: "Marunouchi Mitsubishi Building",
            latitude: 35.6793225,
            longitude: 139.7625863
          },
          notes: "Next: 🟢 Green bus at G1 (11:55)"
        },
        {
          id: "bus-green-segment",
          type: "activity",
          title: "🟢 Green Line: Marunouchi → Tokyo Tower",
          startTime: "11:55",
          endTime: "13:26",
          location: "G1 → G6",
          locationInfo: {
            name: "Marunouchi to Tokyo Tower",
            latitude: 35.6793225,
            longitude: 139.7625863
          },
          notes: "Board at G1 Marunouchi Mitsubishi Building\nAlight at G6 Tokyo Tower"
        },
        {
          id: "gap-tokyo-tower",
          type: "freeTime",
          title: "Free Time • Tokyo Tower",
          startTime: "13:26",
          endTime: "14:10",
          location: "Tokyo Tower",
          locationInfo: {
            name: "Tokyo Tower",
            latitude: 35.6585816,
            longitude: 139.7454374
          },
          notes: "Next: 🔵 Blue bus at B2 (14:10)"
        },
        {
          id: "bus-blue-segment",
          type: "activity",
          title: "🔵 Blue Line: Tokyo Tower → Marunouchi",
          startTime: "14:10",
          endTime: "15:12",
          location: "B2 → B1",
          locationInfo: {
            name: "Tokyo Tower to Marunouchi",
            latitude: 35.6585816,
            longitude: 139.7454374
          },
          notes: "Board at B2 Tokyo Tower\nAlight at B1 Marunouchi (complete Blue loop)"
        },
        {
          id: "gap-marunouchi-2",
          type: "freeTime",
          title: "Free Time • Marunouchi",
          startTime: "15:12",
          endTime: "16:30",
          location: "Marunouchi Mitsubishi Building",
          locationInfo: {
            name: "Marunouchi Mitsubishi Building",
            latitude: 35.6793225,
            longitude: 139.7625863
          },
          notes: "Next: 🔴 Red bus at R1 (16:30)"
        },
        {
          id: "bus-red-segment-2",
          type: "activity",
          title: "🔴 Red Line: Marunouchi → Asakusa",
          startTime: "16:30",
          endTime: "17:08",
          location: "R1 → R5",
          locationInfo: {
            name: "Marunouchi to Asakusa",
            latitude: 35.6793225,
            longitude: 139.7625863
          },
          notes: "Board at R1 Marunouchi Mitsubishi Building\nAlight at R5 Asakusa Hanakawado"
        },
        {
          id: "dinner-izakaya-tsubohachi",
          type: "restaurant",
          title: "Izakaya Tsubohachi",
          startTime: "18:00",
          endTime: "20:00",
          location: "Asakusa Station Building",
          locationInfo: {
            name: "Izakaya Tsubohachi Asakusa",
            nameJa: "居酒屋 つぼ八 浅草店",
            latitude: 35.7112216,
            longitude: 139.7970424,
            address: "2F・3F Asakusa Station Building, 1 Chome-2-3, Hanakawado, Taito City, Tokyo 111-0033, Japan",
            addressJa: "東京都台東区花川戸１丁目２−３2F・3F 浅草駅ビル〒111-0033",
            website: "https://www.izakaya-tsubohachi.com/shops/asakusa/",
            phone: "+81-3-5246-9868"
          },
          notes: "Reservation #86091 • 5 PAX"
        }
      ]
    },
    {
      id: "day-2-nagano-matsumoto",
      date: "2026-06-13",
      dayNumber: 2,
      totalTripDays: 6,
      title: "Nagano & Matsumoto Castle Day",
      events: [
        {
          id: "checkout-koko-hotel",
          type: "hotel",
          title: "KOKO HOTEL Asakusa Komagata",
          startTime: "07:00",
          endTime: "07:10",
          location: "Asakusa, Tokyo",
          locationInfo: {
            name: "KOKO HOTEL Asakusa Komagata",
            nameJa: "KOKO HOTEL 浅草駒形",
            latitude: 35.7077411,
            longitude: 139.7960929,
            address: "2 Chome-7-5 Komagata, Taito City, Tokyo 111-0043, Japan",
            addressJa: "台東区駒形2-7-5, 浅草, 東京都, 日本 111-0043",
            website: "https://koko-hotels.com/asakusa_komagata/",
            phone: "+81-3-6777-1188"
          },
          notes: "Check-out • Booking ID: 1731147118"
        },
        {
          id: "gap-ueno-travel",
          type: "freeTime",
          title: "Free Time • Travel to Ueno",
          startTime: "07:10",
          endTime: "12:30",
          location: "Travel to Ueno",
          notes: "Morning travel and free time before Ueno departure"
        },
        {
          id: "ueno-station-departure",
          type: "activity",
          title: "🚆 Ueno Station Departure",
          startTime: "12:30",
          endTime: "14:00",
          location: "Ueno Station",
          locationInfo: {
            name: "Ueno Station",
            nameJa: "上野駅",
            latitude: 35.7126441,
            longitude: 139.7745247
          },
          notes: "Departure point for Nagano"
        },
        {
          id: "nagano-station-arrival",
          type: "activity",
          title: "🚆 Nagano Station Arrival",
          startTime: "14:00",
          endTime: "15:00",
          location: "Nagano Station",
          locationInfo: {
            name: "Nagano Station",
            nameJa: "長野駅",
            latitude: 36.6431286,
            longitude: 138.1860688
          },
          notes: "Arrival from Tokyo • Transfer to hotel"
        },
        {
          id: "checkin-livmax-nagano",
          type: "hotel",
          title: "Hotel Livmax Premium Nagano Ekimae",
          startTime: "15:00",
          endTime: "15:30",
          location: "Nagano Ekimae",
          locationInfo: {
            name: "Hotel Livmax Premium Nagano Ekimae",
            nameJa: "ホテルリブマックスプレミアム長野駅前",
            latitude: 36.6435,
            longitude: 138.1885,
            address: "1-1-1 Minamisinano, Nagano, Nagano 380-0823, Japan",
            addressJa: "長野県長野市南志賀1-1-1",
            website: "https://www.livmax.co.jp/nagano/",
            phone: "+81-26-217-5111"
          },
          notes: "Check-in • Drop luggage before sightseeing"
        },
        {
          id: "nagano-station-departure-matsumoto",
          type: "activity",
          title: "🚆 Nagano Station to Matsumoto",
          startTime: "15:30",
          endTime: "16:30",
          location: "Nagano Station",
          locationInfo: {
            name: "Nagano Station",
            nameJa: "長野駅",
            latitude: 36.6431286,
            longitude: 138.1860688
          },
          notes: "Shinano Line train to Matsumoto (1 hour)"
        },
        {
          id: "matsumoto-station-arrival",
          type: "activity",
          title: "🚉 Matsumoto Station Arrival",
          startTime: "16:30",
          endTime: "17:00",
          location: "Matsumoto Station",
          locationInfo: {
            name: "Matsumoto Station",
            nameJa: "松本駅",
            latitude: 36.2390438,
            longitude: 137.9658052
          },
          notes: "Walk to castle from station"
        },
        {
          id: "matsumoto-castle-visit",
          type: "activity",
          title: "🏯 Matsumoto Castle",
          startTime: "17:00",
          endTime: "20:00",
          location: "Matsumoto Castle",
          locationInfo: {
            name: "Matsumoto Castle",
            nameJa: "松本城",
            latitude: 36.2386573,
            longitude: 137.9662925,
            address: "4-1 Marunouchi, Matsumoto, Nagano 390-0873, Japan",
            addressJa: "長野県松本市丸の内4-1",
            website: "https://www.matsumoto-castle.jp/",
            phone: "+81-263-32-2902"
          },
          notes: "One of Japan's premier historic castles • Original keep • Evening visit"
        },
        {
          id: "matsumoto-station-departure",
          type: "activity",
          title: "🚆 Matsumoto Station Departure",
          startTime: "20:00",
          endTime: "21:00",
          location: "Matsumoto Station",
          locationInfo: {
            name: "Matsumoto Station",
            nameJa: "松本駅",
            latitude: 36.2390438,
            longitude: 137.9658052
          },
          notes: "Return train to Nagano"
        },
        {
          id: "nagano-station-return",
          type: "activity",
          title: "🚆 Nagano Station Return",
          startTime: "21:00",
          endTime: "21:30",
          location: "Nagano Station",
          locationInfo: {
            name: "Nagano Station",
            nameJa: "長野駅",
            latitude: 36.6431286,
            longitude: 138.1860688
          },
          notes: "Walk back to hotel from station"
        },
        {
          id: "return-livmax-nagano",
          type: "hotel",
          title: "Hotel Livmax Premium Nagano Ekimae",
          startTime: "21:30",
          endTime: "22:00",
          location: "Nagano Ekimae",
          locationInfo: {
            name: "Hotel Livmax Premium Nagano Ekimae",
            nameJa: "ホテルリブマックスプレミアム長野駅前",
            latitude: 36.6435,
            longitude: 138.1885,
            address: "1-1-1 Minamisinano, Nagano, Nagano 380-0823, Japan",
            addressJa: "長野県長野市南志賀1-1-1",
            website: "https://www.livmax.co.jp/nagano/",
            phone: "+81-26-217-5111"
          },
          notes: "Evening return • Rest before tomorrow's Alpine Route tour"
        }
      ]
    },
    {
      id: "day-3-tateyama-kurobe",
      date: "2026-06-14",
      dayNumber: 3,
      totalTripDays: 6,
      title: "Tateyama Kurobe Alpine Route Tour",
      events: [
        {
          id: "tour-start-nagano",
          type: "activity",
          title: "🚌 Tour Start - Nagano Station",
          startTime: "07:30",
          endTime: "09:30",
          location: "Nagano Station",
          locationInfo: {
            name: "Nagano Station",
            nameJa: "長野駅",
            latitude: 36.6431286,
            longitude: 138.1860688
          },
          notes: "Package group tour meeting point"
        },
        {
          id: "ogizawa-stop",
          type: "activity",
          title: "🏔️ Ogizawa Station",
          startTime: "09:30",
          endTime: "10:00",
          location: "Ogizawa",
          locationInfo: {
            name: "Ogizawa Station",
            nameJa: "扇沢駅",
            latitude: 36.5547863,
            longitude: 137.7032369
          },
          notes: "Tateyama Kurobe Alpine Route stop"
        },
        {
          id: "kurobe-dam",
          type: "activity",
          title: "🌊 Kurobe Dam",
          startTime: "10:00",
          endTime: "10:30",
          location: "Kurobe Dam",
          locationInfo: {
            name: "Kurobe Dam",
            nameJa: "黒部ダム",
            latitude: 36.565071,
            longitude: 137.6578517
          },
          notes: "Japan's tallest dam - impressive engineering"
        },
        {
          id: "kurobe-lake",
          type: "activity",
          title: "💧 Kurobe Lake",
          startTime: "10:30",
          endTime: "11:00",
          location: "Kurobe Lake",
          locationInfo: {
            name: "Kurobe Lake",
            nameJa: "黒部湖",
            latitude: 36.5665615,
            longitude: 137.6557487
          },
          notes: "Scenic lake below Kurobe Dam"
        },
        {
          id: "kurobedaira-ropeway",
          type: "activity",
          title: "🚠 Kurobedaira Tateyama Ropeway",
          startTime: "11:00",
          endTime: "11:30",
          location: "Kurobedaira",
          locationInfo: {
            name: "Kurobedaira Station",
            nameJa: "黒部平駅",
            latitude: 36.5670523,
            longitude: 137.6474846
          },
          notes: "Ropeway connection with great views"
        },
        {
          id: "daikanbo-tunnel-bus",
          type: "activity",
          title: "🚐 Daikanbo Tateyama Tunnel Bus",
          startTime: "11:30",
          endTime: "12:00",
          location: "Daikanbo",
          locationInfo: {
            name: "Daikanbo Station",
            nameJa: "大観峰駅",
            latitude: 36.5695077,
            longitude: 137.6291983
          },
          notes: "Tunnel bus through the mountains"
        },
        {
          id: "murodo-station",
          type: "activity",
          title: "⛰️ Murodo Station",
          startTime: "12:00",
          endTime: "14:00",
          location: "Murodo",
          locationInfo: {
            name: "Murodo Station",
            nameJa: "室堂駅",
            latitude: 36.5807356,
            longitude: 137.593765
          },
          notes: "High-altitude station - lunch break & exploration"
        },
        {
          id: "snow-wall-sightseeing",
          type: "activity",
          title: "❄️ Snow Wall Sightseeing",
          startTime: "14:00",
          endTime: "14:30",
          location: "Murodo Snow Wall",
          locationInfo: {
            name: "Murodo Snow Wall",
            nameJa: "室堂雪の大谷",
            latitude: 36.5762429,
            longitude: 137.5965287
          },
          notes: "Famous snow corridor - walk through massive snow walls"
        },
        {
          id: "bijodaira-station",
          type: "activity",
          title: "🌲 Bijodaira Station",
          startTime: "14:30",
          endTime: "15:00",
          location: "Bijodaira",
          locationInfo: {
            name: "Bijodaira Station",
            nameJa: "美女平駅",
            latitude: 36.5799815,
            longitude: 137.4445409
          },
          notes: "Mountain station with alpine views"
        },
        {
          id: "tateyama-station-toyama",
          type: "activity",
          title: "🚃 Tateyama Station (Toyama side)",
          startTime: "15:00",
          endTime: "18:30",
          location: "Tateyama Station",
          locationInfo: {
            name: "Tateyama Station (Toyama)",
            nameJa: "立山駅（富山側）",
            latitude: 36.5833392,
            longitude: 137.4429136
          },
          notes: "End of Alpine Route - rest and return journey"
        },
        {
          id: "tour-end-nagano",
          type: "activity",
          title: "🚌 Tour Return - Nagano Station",
          startTime: "18:30",
          endTime: "19:00",
          location: "Nagano Station",
          locationInfo: {
            name: "Nagano Station",
            nameJa: "長野駅",
            latitude: 36.6431286,
            longitude: 138.1860688
          },
          notes: "Package tour conclusion - dinner and rest before shinkansen"
        },
        {
          id: "nagano-evening-free-time",
          type: "freeTime",
          title: "Free Time • Nagano Station",
          startTime: "19:00",
          endTime: "21:00",
          location: "Nagano Station area",
          locationInfo: {
            name: "Nagano Station",
            nameJa: "長野駅",
            latitude: 36.6431286,
            longitude: 138.1860688
          },
          notes: "Dinner break before shinkansen departure • Board at 21:00"
        },
        {
          id: "shinkansen-nagano-to-ueno",
          type: "shinkansen",
          title: "🚄 Shinkansen Nagano → Ueno",
          startTime: "21:00",
          endTime: "22:30",
          location: "Nagano Station → Ueno Station",
          locationInfo: {
            name: "Ueno Station",
            nameJa: "上野駅",
            latitude: 35.7126441,
            longitude: 139.7745247
          },
          notes: "Asama Shinkansen • Direct to Tokyo • 1.5 hour journey"
        },
        {
          id: "ueno-station-arrival-night",
          type: "activity",
          title: "🚉 Ueno Station Arrival",
          startTime: "22:30",
          endTime: "23:00",
          location: "Ueno Station",
          locationInfo: {
            name: "Ueno Station",
            nameJa: "上野駅",
            latitude: 35.7126441,
            longitude: 139.7745247
          },
          notes: "Late night arrival from Nagano • Travel to Asakusa for hotel"
        },
        {
          id: "checkin-apa-asakusa-ekimae",
          type: "hotel",
          title: "APA Hotel Asakusa Ekimae",
          startTime: "23:00",
          endTime: "23:10",
          location: "Asakusa, Tokyo",
          locationInfo: {
            name: "APA Hotel Asakusa Ekimae",
            nameJa: "APAホテル浅草駅前",
            latitude: 35.7126,
            longitude: 139.7965,
            address: "2-13-10 Higashi-Komagata, Taito City, Tokyo 111-0043, Japan",
            addressJa: "東京都台東区東駒形2-13-10",
            website: "https://www.apahotel.com/",
            phone: "+81-3-5830-5111"
          },
          notes: "Late check-in after Alpine Route tour • End of Day 3"
        }
      ]
    },
    {
      id: "day-4-tokyo",
      date: "2026-06-15",
      dayNumber: 4,
      totalTripDays: 6,
      title: "Tokyo - Day 4",
      events: [
        {
          id: "ikebukuro-sunshine-city",
          type: "activity",
          title: "🌆 Ikebukuro Sunshine City",
          startTime: "10:00",
          endTime: "13:00",
          location: "Ikebukuro",
          locationInfo: {
            name: "Sunshine City",
            nameJa: "サンシャインシティ",
            latitude: 35.7297,
            longitude: 139.7425,
            address: "3-1-4 Higashi-Ikebukuro, Toshima City, Tokyo 170-8630, Japan",
            addressJa: "東京都豊島区東池袋3-1-4",
            website: "https://sunshinecity.jp/",
            phone: "+81-3-5396-6000"
          },
          notes: "Shopping complex • Aquarium • Planetarium • Observation deck"
        },
        {
          id: "chiikawa-park",
          type: "activity",
          title: "🎀 Chiikawa Park",
          startTime: "13:00",
          endTime: "16:00",
          location: "Sunshine City Annex",
          locationInfo: {
            name: "Chiikawa Park (Sunshine City Annex)",
            nameJa: "ちいかわパーク (サンシャインシティ別館)",
            latitude: 35.7298,
            longitude: 139.7428,
            address: "3-3-5 Higashi-Ikebukuro, Toshima-ku, Tokyo 170-0013, Japan",
            addressJa: "東京都豊島区東池袋3-3-5",
            website: "https://chiikawapark-tokyo.jp/",
            phone: "+81-3-5396-6000"
          },
          notes: "Chiikawa themed park • Sunshine City Annex B1F & 1F • Same complex as morning visit"
        }
      ]
    },
    {
      id: "day-5-tokyo",
      date: "2026-06-16",
      dayNumber: 5,
      totalTripDays: 6,
      title: "Tokyo - Day 5",
      events: [
        {
          id: "capyneko-harajuku",
          type: "activity",
          title: "🐱 CapyNeko Harajuku",
          startTime: "14:00",
          endTime: "16:30",
          location: "Harajuku",
          locationInfo: {
            name: "CapyNeko Cafe Harajuku",
            nameJa: "カピネコカフェ 原宿",
            latitude: 35.6725,
            longitude: 139.7031,
            address: "1-6-10 Jingumae, Shibuya, Tokyo 150-0001, Japan",
            addressJa: "〒150-0001 東京都渋谷区神宮前1−6−10 Bsquare竹下通り 2F",
            website: "https://capynecocafe.com/",
            phone: "+81-3-6271-5127"
          },
          notes: "Character-themed cafe • 2nd Floor Bsquare Takeshita Street • CPT (Capybara) themed"
        },
        {
          id: "travel-shibuya-gap",
          type: "freeTime",
          title: "Free Time • Travel Harajuku to Shibuya",
          startTime: "16:30",
          endTime: "17:00",
          location: "Harajuku to Shibuya",
          locationInfo: {
            name: "Harajuku to Shibuya",
            latitude: 35.665,
            longitude: 139.704
          },
          notes: "30 min travel via Yamanote Line • 1 stop to Shibuya"
        },
        {
          id: "shibuya-onsen-reservation",
          type: "activity",
          title: "♨️ Hokkaido Menkoi Kumasan Onsen Shibuya no Yu",
          startTime: "17:00",
          endTime: "18:45",
          location: "Shibuya",
          locationInfo: {
            name: "Hokkaido Menkoi Kumasan Onsen Shibuya no Yu (ASSORTI SHIBUYA)",
            nameJa: "北海道めんこいくまちゃん温泉 渋谷の湯 (アソルティ渋谷)",
            latitude: 35.6595,
            longitude: 139.7019,
            address: "3-12 Udagawacho, Shibuya, Tokyo 150-0042, Japan",
            addressJa: "〒150-0042 東京都渋谷区宇田川町32−12 アソルティ渋谷 ３Ｆ",
            website: "https://www.398to.com/shibuya/",
            phone: "+81-3-6427-1613"
          },
          notes: "Reservation #112820 • 2 adults • Table seating • BERNARDO Edward (べるなるど えどわーど) • drawde600@gmail.com • Guest phone: +639478373301"
        }
      ]
    },
    {
      id: "departure-day",
      date: "2026-06-16",
      dayNumber: 6,
      totalTripDays: 6,
      title: "Departure from Tokyo",
      events: [
        {
          id: "free-time-after-onsen",
          type: "freeTime",
          title: "Free Time • After Onsen",
          startTime: "18:45",
          endTime: "20:00",
          location: "Shibuya area",
          locationInfo: {
            name: "Shibuya",
            nameJa: "渋谷",
            latitude: 35.6595,
            longitude: 139.7019
          },
          notes: "Free time and dinner in Shibuya after onsen • Before airport departure"
        },
        {
          id: "travel-to-haneda",
          type: "activity",
          title: "🚆 Travel to Haneda Airport",
          startTime: "20:00",
          endTime: "21:30",
          location: "Shibuya → Haneda Airport",
          locationInfo: {
            name: "Haneda Airport Terminal 3",
            nameJa: "羽田空港第３ターミナル",
            latitude: 35.5446472,
            longitude: 139.7652128
          },
          notes: "Travel from Shibuya to Haneda • Allow 1.5 hours for airport arrival"
        },
        {
          id: "flight-jl0077-departure",
          type: "flight",
          title: "JL0077 - Departure",
          startTime: "23:00",
          endTime: "23:15",
          location: "HANEDA T3",
          locationInfo: {
            name: "Haneda Airport Terminal 3",
            latitude: 35.5446472,
            longitude: 139.7652128
          },
          flightNumber: "JL0077"
        }
      ]
    }
  ]
};
