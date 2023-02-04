import React, { ComponentType } from "react"
import { View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { HomeScreen } from "../screens"
import { AddEventScreen } from "../screens/AddEventScreen"
import { ProfileScreen } from "../screens/ProfileScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeIcon from "../../assets/icons/homeIcon.svg"
import AddEventIcon from "../../assets/icons/addEventIcon.svg"
import ProfileIcon from "../../assets/icons/profileIcon.svg"


const Tab = createBottomTabNavigator()

const TabBarIcon = ({ Component, focused }: { Component: ComponentType; focused: boolean }) => (
  <View style={$tabBarIcon}>
    {/* Change based on focused prop */}
    <Component />
  </View>
)

export function HomeNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 40,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon Component={HomeIcon} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon Component={AddEventIcon} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon Component={ProfileIcon} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBarIcon: ViewStyle = {
  top: 15,
}
