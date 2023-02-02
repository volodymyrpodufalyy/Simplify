import React from "react"
import { View, ViewStyle } from "react-native"
import {  BottomSheetApp, Header, Text } from "../components"
import { colors, spacing } from "../theme"
import { Calendar } from "react-native-calendars"
import {  GestureHandlerRootView } from "react-native-gesture-handler"

export const HomeScreen = () => {


  return (
    <GestureHandlerRootView style={{flex:1}}>
    <View style={$container}>
      <Header title={'February'}
              titleContainerStyle={{alignItems:'flex-start'}}
              rightIcon={'calendar'}
              rightIconColor={colors.palette.neutral750}
              backgroundColor={colors.palette.neutral100}
      />

      <View>
        <Calendar
          theme={{
            // @ts-ignore
            "stylesheet.calendar.header": {
              header: {
                height: 0,
                opacity: 0
              }
            }
          }}
        />
      </View>
      <View style={{position:'absolute', height:'100%', width:'100%'}}>
        <BottomSheetApp/>
      </View>

    </View>
    </GestureHandlerRootView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: '100%',
  width:'100%',
  backgroundColor: '#fff',
}
const $upcomingContainer: ViewStyle = {
  flex: 1,
  height: '100%',
  width:'100%',
  backgroundColor: colors.palette.neutral750,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.large

}
const $item: ViewStyle = {
  height: 100,
  width:'100%',
  backgroundColor: colors.palette.secondary500,
  borderRadius: 30,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.large

}
