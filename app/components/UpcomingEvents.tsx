import { ActivityIndicator, Text, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import React, { useEffect, useMemo, useState } from "react"
import { FlashList } from "@shopify/flash-list"
import firestore from "@react-native-firebase/firestore"
import type { Event } from "../common/types/Events"
import { EventCard } from "./EventCard"
import auth from "@react-native-firebase/auth"

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
    if (categoryFilter)
      return events.filter(event => event.category == categoryFilter)
    else return events
  }, [events])
  
  return (
    <View style={$container}>
      <Text style={$upcomingEventsTitle}>Upcoming events</Text>
      {!loading ?
        <FlashList
          data={events}
          renderItem={({ item }) => (
            <EventCard event={item} />
          )}
          estimatedItemSize={10}
        />
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

const $upcomingEventsTitle: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 24,
  ...typography.primary,
  textAlign: "center",
  paddingTop: spacing.medium,
  marginBottom: 20,
}