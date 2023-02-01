import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,

} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { SignupScreen, WelcomeScreen} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { HomeNavigator } from "./HomeNavigator"
import { tr } from "date-fns/locale"


const exitRoutes = Config.exitRoutes

const Stack = createNativeStackNavigator()

const AppStack = ()=> {

  const isAuthenticated = false


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Welcome"}
    >

      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomeNavigation" component={HomeNavigator}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={SignupScreen} />
        </>
      )}

    </Stack.Navigator>
  )
}


export const AppNavigator = () => {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <AppStack />
    </NavigationContainer>
  )
}
