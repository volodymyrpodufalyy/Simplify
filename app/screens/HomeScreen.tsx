import React from "react"
import { View, ViewStyle } from "react-native"
import { Header, Text} from "../components"
import { colors, spacing } from "../theme"
import { Calendar } from "react-native-calendars"

export const HomeScreen = () => {


  return (
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
      <View style={$upcomingContainer}>
        <Text tx={'HomeScreen.upcoming'} style={{color:colors.palette.neutral100,marginBottom:20}} size={'md'} />
        <View style={$item}>

        </View>
      </View>
    </View>
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
