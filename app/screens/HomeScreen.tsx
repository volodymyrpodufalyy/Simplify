import React, { useEffect, useMemo } from "react"
import { View, ViewStyle } from "react-native"
import { Header, UpcomingEvents } from "../components"
import { colors } from "../theme"
import { Calendar, CalendarProvider } from "react-native-calendars"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useAppDispatch, useAppSelector } from "../store/store"
import { format } from "date-fns"
import { setDate } from "../store/events/reducer"
import { DateData } from "react-native-calendars/src/types"
import { setCurrentEvent } from "../store/event/action"

export const HomeScreen = ({navigation}) => {


  const { selectedDate } = useAppSelector(state => state.EventsReducer)
  const dispatch = useAppDispatch()

  const onDayPress = (day: DateData) => {
    dispatch(setDate(new Date(day.dateString)))
  }

  const selectedDay = format(selectedDate, "yyyy-MM-dd")

  const markedDates = useMemo(() => {
    return {
      [selectedDay]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#5E60CE",
        selectedTextColor: "white",
      },
    }
  }, [selectedDate])

  useEffect(()=>{
    dispatch(setCurrentEvent(null))
  },[])

  const openEvent = (event) => {
    dispatch(setCurrentEvent(event))
    navigation.navigate('AddEvent')
  }

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
          <CalendarProvider date={format(selectedDate, "yyyy-MM-dd")}>
            <Calendar
              current={format(selectedDate, "yyyy-MM-dd")}
              style={{ height: 260 }}
              onDayPress={onDayPress}
              markedDates={markedDates}
              // @ts-ignore (Override default styles. Custom styles type-checks isn't fully supported)
              theme={{
                ...calendarTheme,
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#b6c1cd",
                textSectionTitleDisabledColor: "#d9e1e8",
                selectedDayBackgroundColor: "#00adf5",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00adf5",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "orange",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "blue",
                indicatorColor: "blue",
              }}
            />
          </CalendarProvider>
        </View>
        <View style={$bottomContainer}>
          <UpcomingEvents openEvent={openEvent} />
        </View>
      </View>
      <View style={$tabBarWrapper} />
    </GestureHandlerRootView>
  )
}

export const $tabBarWrapper: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.palette.neutral750,
  height: 60,
  width: "100%",
  bottom: 0,
  zIndex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#fff",
}

const $topContainer: ViewStyle = {
  backgroundColor: "#fff",
  height: 260,
}

const $bottomContainer: ViewStyle = {
  flex: 1,
}

const $calendar = {
  header: {
    height: 0,
    opacity: 0,
  },
}

const calendarTheme = { "stylesheet.calendar.header": $calendar }
