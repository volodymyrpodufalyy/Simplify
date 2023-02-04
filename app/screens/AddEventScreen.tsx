import React from "react"
import { SafeAreaView, Text, TextStyle, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"

export const AddEventScreen = () => {
  return (
    <SafeAreaView style={$container}>
      {/* TODO: Fill with content */}
      <Text style={$title}>Add event</Text>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
}

const $title: TextStyle = {
  fontSize: 24,
  ...typography.primary,
  textAlign: "center",
  paddingTop: spacing.medium,
}
