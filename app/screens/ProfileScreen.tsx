import {
  Image,
  ImageStyle,
  SafeAreaView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing, typography } from "../theme"
import React from "react"
import { Icon } from "../components"

const welcomeFace = require("../../assets/images/welcome-image.png")

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={$container}>
      <View style={$topContainer}>
        <TouchableOpacity style={{position:'absolute', right:20, top:20,}}>
          <Icon icon={'exit'} size={22}/>
        </TouchableOpacity>
        <View style={$profileCard}>
          <Image source={welcomeFace} style={$userImage} />
          <Text style={$username}>Hello @username!</Text>
        </View>

      </View>
      <View style={$bottomContainer}>
        <View style={$sectionContainer}>
          <Icon icon={"peoples"} color={"white"} size={28} />
          <View style={$sectionText}>
            <Text style={{ color: "white", fontSize: 18,  }}>Username:</Text>
            <TextInput value={"asdsd"} style={{ padding:0, paddingVertical:5, color: colors.palette.neutral400, fontSize: 18 }} />
          </View>
        </View>
        <View style={$sectionContainer}>
          <Icon icon={"calendar"} color={"white"} size={28} />
          <View style={$sectionText}>
            <Text style={{ color: "white", fontSize: 18,  }}>Email:</Text>
            <TextInput value={"asdsd@gmail.com"} style={{ padding:0, paddingVertical:5, color: colors.palette.neutral400, fontSize: 18 }} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral750,
}

const $sectionContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1,
  borderColor: colors.palette.neutral600,
  paddingHorizontal: spacing.large,
}

const $sectionText: ViewStyle = {
  justifyContent: "center",
  marginLeft: spacing.medium,
  paddingVertical: spacing.small,
}

const $topContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  width: "100%",
  height: 200,
  alignItems: "center",
}

const $bottomContainer: ViewStyle = {
  paddingTop: 120,
}
const $profileCard: TextStyle = {
  position: "absolute",
  backgroundColor: colors.palette.neutral750,
  width: "90%",
  height: 200,

  bottom: -100,

  borderRadius: 15,

  shadowColor: colors.palette.neutral100,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 11.95,

  elevation: 20,

  alignItems: "center",
  justifyContent: "center",
}
const $userImage: ImageStyle = {
  position: "relative",
  height: 100,
  width: 100,
  borderRadius: 50,

}
const $username: TextStyle = {
  fontSize: 20,
  color: "white",
  ...typography.primary,
  paddingTop: spacing.small,

}
