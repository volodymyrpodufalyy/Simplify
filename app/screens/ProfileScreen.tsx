import { SafeAreaView, Text, TextStyle, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import React from "react"

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={$container}>
      {/* TODO: Fill with content: details, avatar, logout etc. */}
      <Text style={$title}>Profile</Text>
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
  paddingTop: spacing.medium,
}
