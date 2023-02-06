import React, { useState } from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { Header } from "../components"
import { colors, spacing, typography } from "../theme"
import { Calendar, CalendarProvider } from "react-native-calendars"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { rootReducer, useAppSelector } from "../store/store"

export const HomeScreen = () => {
  const [heightCalendar, setHeightCalendar] = useState(1)
  const date = new Date()
  const { user } = useAppSelector((state: rootReducer) => state.AuthReducer)
  console.log(user)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={$container}>
        <Header
          title={"February"}
          titleContainerStyle={{ alignItems: "flex-start" }}
          rightIcon={"calendar"}
          rightIconColor={colors.palette.neutral750}
          backgroundColor={colors.palette.neutral100}
        />
        <View style={$topContainer}>
          <CalendarProvider date={"2023-02-02"}>
            <Calendar
              // @ts-ignore (Override default styles. Custom styles type-checks isn't fully supported)
              theme={calendarTheme}
            />
          </CalendarProvider>
        </View>
        <View style={$bottomContainer}>
          {/* TODO: replace with <UpcomingEvents /> component */}
          <Text style={$upcomingEventsTitle}>Upcoming</Text>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#fff",
}

const $topContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#fff",
}

const $bottomContainer: ViewStyle = {
  flex: 2,
  backgroundColor: colors.palette.neutral750,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
}

const $upcomingEventsTitle: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 20,
  ...typography.primary,
  textAlign: "center",
  paddingTop: spacing.medium,
}

const $calendar = {
  header: {
    height: 0,
    opacity: 0,
  },
}

const calendarTheme = { "stylesheet.calendar.header": $calendar }
