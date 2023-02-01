import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Text,
} from "../components"
import { colors, spacing } from "../theme"

const welcomeFace = require("../../assets/images/welcome-image.png")

export const WelcomeScreen = ({ navigation }) => {

  function goNext() {
    navigation.navigate("Login")
  }


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


      <Image style={$welcomeFace} source={welcomeFace} />


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
  justifyContent: "space-around",
  backgroundColor: colors.palette.neutral100,
}

const $topContainer: ViewStyle = {
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}

const $welcomeFace: ImageStyle = {
  height: 450,
  width: 450,
  right: -30,
}


