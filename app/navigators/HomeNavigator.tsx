import React from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { HomeScreen } from "../screens"
import { ProfileScreen } from "../screens/ProfileScreen"
import { NavigationProp } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { Icon, IconTypes } from "../components"
import { colors } from "../theme"
import { AppStackParamList } from "./AppNavigator"

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

const MockComponent = () => <></>

export function HomeNavigator({ navigation }: { navigation: NavigationProp<AppStackParamList, "HomeNavigation"> }) {
  const tabOffset = useSharedValue(0)
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(tabOffset.value, {}) }],
    }
  })
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      tabOffset.value = 0
    })
    
    return unsubscribe
  }, [navigation])
  
  return (
    <View style={{ flex: 1, zIndex: 0, backgroundColor: "#fff" }}>
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
          name="AddEventTab"
          component={MockComponent}
          options={{
            tabBarIcon: ({ focused }) => <TabBarIcon icon={"addEvent"} focused={focused} />,
            tabBarStyle: { display: "none" },
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault()
              navigation.navigate("AddEvent")
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
    </View>
  )
}


const $tabIndicator: ViewStyle = {
  width: getWidth() - 24,
  height: 4,
  backgroundColor: colors.palette.angry500,
  position: "absolute",
  bottom: 73,
  left: 50,
  borderRadius: 30,
  zIndex: 1,
}

const $tabBar: ViewStyle = {
  backgroundColor: "white",
  position: "absolute",
  bottom: 25,
  marginHorizontal: 20,
  height: 50,
  borderRadius: 30,
  shadowColor: "white",
  shadowOpacity: 0.06,
  shadowOffset: {
    width: 5,
    height: 5,
  },
  paddingBottom: 0,
  zIndex: 5,
}

function getWidth() {
  const width = Dimensions.get("window").width - 80
  
  // Total three Tabs...
  return width / 3
}
