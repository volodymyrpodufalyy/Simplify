import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { AddNewEventScreen, SignInScreen, SignupScreen, WelcomeScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { HomeNavigator } from "./HomeNavigator"
import { rootReducer, useAppDispatch, useAppSelector } from "../store/store"
import { getCurrentUser } from "../store/auth/action"


const exitRoutes = Config.exitRoutes

/**
 * Types for screen params
 * pass undefined if screen does not accept any params
 */
export type AppStackParamList = {
  Welcome: undefined,
  HomeNavigation: undefined,
  AddEvent: { date: Date },
  SignUp: undefined,
  SignIn: undefined,
}

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCurrentUser([]))
  }, [])
  
  const { user } = useAppSelector((state: rootReducer) => state.AuthReducer)
  
  const isAuthenticated = Boolean(user)
  
  
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        }
      }}
      initialRouteName={"Welcome"}
    >
      
      {isAuthenticated ? (
        <>
          <Stack.Group>
            <Stack.Screen name="HomeNavigation" component={HomeNavigator} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="AddEvent" component={AddNewEventScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        
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
