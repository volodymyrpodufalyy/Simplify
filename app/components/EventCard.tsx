import React, { useMemo } from "react"
import { Event } from "../common/types/Events"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Icon } from "./Icon"
import { timestampToDate } from "../utils/date"

import { formatHourMinutes } from "../utils/formatDate"

interface EventCardProps {
  event: Event;
  openEvent: any
}

export const EventCard = (props: EventCardProps) => {
  const { event, openEvent } = props

  const { startDate, endDate } = useMemo(() => {
    return {
      startDate: timestampToDate(event.startDate) ,
      endDate: timestampToDate(event.endDate)
    }
  }, [event])

  return (
    <TouchableOpacity style={$eventCard} onPress={()=>openEvent(event)}>
      <View style={$halfContainer}>
        <Text style={$eventNameText}>{event.name}</Text>
      </View>
      <View style={$halfContainer}>
        {event.category ?
          <View style={$eventCategory}>
            <Text style={$eventCategoryText}>{event.category}</Text>
          </View> : null}
        <View style={$timeContainer}>
          {event.files.length>=1? <Icon icon={"file"} size={18} style={{marginRight:5}} />: null}
          <Icon icon={"clock"} size={18}/>
          <Text style={$eventDateText}>{formatHourMinutes(startDate)}-{formatHourMinutes(endDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const $eventCard: ViewStyle = {
  flex: 1,
  marginHorizontal: 30,
  backgroundColor: colors.palette.eventBg,
  borderRadius: 15,
  paddingLeft: 30,
  paddingVertical: 10,
  marginBottom: 15,
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
  alignItems: "center",
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

const $eventDateText: TextStyle = {
  paddingLeft: 6,
  color: colors.palette.neutral800,
}
