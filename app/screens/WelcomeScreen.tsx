import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Text,
} from "../components"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"


const welcomeFace = require("../../assets/images/welcome-image.png")


export const WelcomeScreen = ({ navigation }) => {

  function goNext() {
    navigation.navigate("Login")
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.welcome"
          preset="heading"
        />
      </View>

      <View>
        <Image style={$welcomeFace} source={welcomeFace} />
      </View>

      <View style={$bottomContainer}>
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={goNext}
        />
      </View>


    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection:'column',
  backgroundColor: colors.palette.neutral100,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,

  flexBasis: "65%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "50%",


  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeFace: ImageStyle = {
  height: 500,
  width: 500,

  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
