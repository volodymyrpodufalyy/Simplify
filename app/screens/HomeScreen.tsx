import React from "react"
import { Text, View, ViewStyle } from "react-native"

export const HomeScreen = () => {

  return (
    <View style={$container}>
      <Text>Home screen</Text>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: '#fff',
}
