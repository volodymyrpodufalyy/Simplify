import React from "react"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { EventCategory } from "../common/types/Events"
import { colors, typography } from "../theme"

interface FilterProps {
  category: EventCategory;
  onPress: () => void;
}

export const Filter = (props: FilterProps) => {
  const { category, onPress } = props
  
  return (
    <TouchableOpacity onPress={onPress} style={$container}>
      <Text style={$eventCategoryText}>{category}</Text>
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  flex: 1,
  borderRadius: 10,
  borderColor: colors.palette.neutral100,
  borderWidth: 2,
  padding: 5,
  height: 40,
  marginHorizontal: 4,
}

const $eventCategoryText: TextStyle = {
  fontSize: 16,
  color: colors.palette.neutral100,
  textAlign: "center",
  ...typography.secondary,
}