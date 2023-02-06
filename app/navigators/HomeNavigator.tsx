import React, { useState } from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { AddNewEventScreen, HomeScreen } from "../screens"
import { ProfileScreen } from "../screens/ProfileScreen"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { Icon, IconTypes } from "../components"
import { colors } from "../theme"

const Tab = createBottomTabNavigator()

const TabBarIcon = ({
                      icon,
                      focused,
                      left,
                    }: {
  icon: IconTypes
  focused: boolean
  left?: number
}) => (
  <View style={{ left }}>
    <Icon icon={icon} {...(focused && { color: colors.palette.neutral800 })} />
  </View>
)

export function HomeNavigator() {
  const tabOffset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(tabOffset.value, {}) }],
    }
  })

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: $tabBar,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon icon={"home"} left={10} focused={focused} />,
          }}
          listeners={() => ({
            tabPress: () => {
              tabOffset.value = 0
            },
          })}
        />
        <Tab.Screen
          name="AddEvent"
          component={AddNewEventScreen}

          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon icon={"addEvent"} focused={focused} />,
            tabBarStyle: {display:"none"}
          }}
          listeners={() => ({
            tabPress: () => {
              tabOffset.value = -500
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon icon={"profile"} left={-12} focused={focused} />
            ),
          }}
          listeners={() => ({
            tabPress: () => {
              tabOffset.value = getWidth() * 2
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View style={[$tabIndicator, animatedStyles]} />
    </>
  )
}

const $tabIndicator: ViewStyle = {
  width: getWidth() - 24,
  height: 3,
  backgroundColor: colors.palette.primary400,
  position: "absolute",
  bottom: 98,
  left: 50,
  borderRadius: 30,
  zIndex: 5,
}

const $tabBar: ViewStyle = {
  backgroundColor: "white",
  position: "absolute",
  bottom: 40,
  marginHorizontal: 20,
  height: 60,
  borderRadius: 30,
  shadowColor: "white",
  shadowOpacity: 0.06,
  shadowOffset: {
    width: 5,
    height: 5,
  },
  paddingBottom: 0,
}

function getWidth() {
  const width = Dimensions.get("window").width - 80

  // Total three Tabs...
  return width / 3
}
