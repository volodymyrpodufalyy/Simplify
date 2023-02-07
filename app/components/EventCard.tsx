import React, { useMemo } from "react"
import { Event } from "../common/types/Events"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Icon } from "./Icon"
import { timestampToDate } from "../utils/date"
import format from "date-fns/format"


interface EventCardProps {
  event: Event;
}

export const EventCard = (props: EventCardProps) => {
  const { event } = props
  
  const { startDate, endDate } = useMemo(() => {
    return {
      startDate: format(timestampToDate(event.startDate), "hh:mm"),
      endDate: format(timestampToDate(event.endDate), "hh:mm"),
    }
  }, [event])
  
  return (
    <View style={$eventCard}>
      <View style={$halfContainer}>
        <Text style={$eventNameText}>{event.name}</Text>
      </View>
      <View style={$halfContainer}>
        <View style={$eventCategory}>
          <Text style={$eventCategoryText}>{event.category}</Text>
        </View>
        <View style={$timeContainer}>
          <Icon icon={"clock"} />
          <Text>{startDate} - {endDate}</Text>
        </View>
      </View>
    </View>
  )
}


const $eventCard: ViewStyle = {
  flex: 1,
  marginHorizontal: 30,
  backgroundColor: colors.palette.eventBg,
  borderRadius: 15,
  paddingLeft: 30,
  paddingVertical: 10,
  marginBottom: 20,
  flexDirection: "column",
  paddingRight: 10,
}

const $halfContainer: ViewStyle = {
  flex: 1,
  alignItems: "flex-end",
  flexDirection: "row",
  display: "flex",
  flexWrap: "wrap",
}

const $timeContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
}

const $eventCategory: ViewStyle = {
  height: 24,
  flex: 1,
  backgroundColor: colors.palette.neutral600,
  borderRadius: 15,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  marginTop: 26,
}

const $eventCategoryText: TextStyle = {
  fontSize: 18,
  color: colors.palette.neutral100,
  textAlign: "center",
  ...typography.secondary,
}

const $eventNameText: TextStyle = {
  color: colors.palette.neutral800,
  fontSize: 18,
  fontWeight: "600",
  ...typography.secondary,
  textAlign: "left",
}