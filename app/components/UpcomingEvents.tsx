import { ActivityIndicator, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { FlashList } from "@shopify/flash-list"
import firestore from "@react-native-firebase/firestore"
import type { Event, EventCategory } from "../common/types/Events"
import { EventCard } from "./EventCard"
import auth from "@react-native-firebase/auth"
import { CATEGORIES } from "../common/constants"
import { Filter } from "./Filter"

export const UpcomingEvents = () => {
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [categoryFilter, setCategoryFilter] = useState("")
  
  const user = auth().currentUser
  
  useEffect(() => {
    const subscriber = firestore()
      .collection("events")
      .where("userId", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const result = []
        
        if (querySnapshot) {
          querySnapshot.forEach(documentSnapshot => {
            result.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            })
          })
          setEvents(result)
          setLoading(false)
        }
      })
    
    // Unsubscribe from events when no longer in use
    return () => subscriber()
  }, [])
  
  const filteredEvents = useMemo(() => {
    if (categoryFilter && categoryFilter !== "All")
      return events.filter(event => event.category === categoryFilter)
    else return events
  }, [events, categoryFilter])
  
  const onFilterPress = useCallback((e: string) => {
    setCategoryFilter(e)
  }, [])
  
  return (
    <View style={$container}>
      <Text style={$upcomingEventsTitle}>Upcoming events</Text>
      {!loading ?
        <View style={{ flex: 1 }}>
          <View style={{ height: 70 }}>
            <ScrollView horizontal={true} style={$filters}>
              {["All", ...CATEGORIES].map((i) =>
                <Filter
                  onPress={() => onFilterPress(i)} key={i}
                  category={i as EventCategory} />,
              )}
            </ScrollView>
          </View>
          <FlashList
            data={filteredEvents}
            renderItem={({ item }) => (
              <EventCard event={item} />
            )}
            estimatedItemSize={10}
          />
        </View>
        :
        <ActivityIndicator />
      }
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral750,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
}

const $filters: ViewStyle = {
  marginHorizontal: 30,
  marginVertical: 10,
  paddingRight: 40,
  flexDirection: "row",
}

const $upcomingEventsTitle: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 24,
  ...typography.primary,
  textAlign: "center",
  paddingTop: spacing.medium,
  marginBottom: 20,
}