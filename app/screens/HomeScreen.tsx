import React from "react"
import { View, ViewStyle } from "react-native"
import { Header, UpcomingEvents } from "../components"
import { colors } from "../theme"
import { Calendar, CalendarProvider } from "react-native-calendars"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useAppSelector } from "../store/store"

export const HomeScreen = () => {
  const { user } = useAppSelector((state) => state.AuthReducer)
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
          <UpcomingEvents />
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
}

const $calendar = {
  header: {
    height: 0,
    opacity: 0,
  },
}

const calendarTheme = { "stylesheet.calendar.header": $calendar }
