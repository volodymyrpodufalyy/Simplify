import React from "react"
import { Image, ImageStyle, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import {
  Button, Header, Icon,
  Text, TextField,
} from "../components"
import { colors, spacing } from "../theme"


export const AddNewEventScreen = ({ navigation }) => {

  return (
    <View style={$container}>
      <Header titleStyle={{ color: colors.palette.neutral100, fontSize: 18 }}
              leftTextStyle={{ color: colors.palette.neutral100 }}
              leftIcon={"caretLeft"}
              leftIconColor={colors.palette.neutral100}
              titleTx={"NewEventScreen.newActivity"}
              rightIcon={"check"}
              rightIconColor={colors.palette.neutral100}
              containerStyle={{ borderBottomWidth: 0.5, borderColor: colors.palette.neutral800 }}
              backgroundColor={colors.palette.secondary600} />
      <View style={$inputContainer}>
        <Icon icon={"play"} color={"white"} size={30} />
        <TextInput style={$inputName} placeholder={"What is planed?"}
                   placeholderTextColor={colors.palette.neutral400} />
      </View>
      <View style={$categoryContainer}>
        <Icon icon={"categories"} color={"white"} size={28} />
        <View style={$sectionText}>
          <Text text={"Choose category"} style={{ color: "white" }} size={"md"} />
        </View>
      </View>
      <View style={$sections}>
        <View style={$sectionContainer}>
          <Icon icon={"time"} color={"white"} size={30} />
          <View style={$sectionText}>
            <Text tx={"NewEventScreen.timeRange"} style={{ color: "white" }} size={"md"} />
          </View>
        </View>
        <View style={$sectionContainer}>
          <View style={$sectionTime}>
            <TouchableOpacity>
              <Text text={"1:00"} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
            <Text text={" - "} style={{ color: "white" }} size={"md"} />
            <TouchableOpacity>
              <Text text={"12:00"} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={$sectionContainer}>
          <Icon icon={"calendar"} color={"white"} size={28} />
          <View style={$sectionText}>
            <Text text={"Nov 1, 2023"} style={{ color: "white" }} size={"md"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={$sectionContainer}>
          <Icon icon={"notes"} color={"white"} size={30} />
          <View style={$sectionText}>
            <Text tx={"NewEventScreen.addNote"} style={{ color: "white" }} size={"md"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={$sectionContainer}>
          <Icon icon={"peoples"} color={"white"} size={30} />
          <TextInput style={$inputName} placeholder={"Add peoples for event"}
                     placeholderTextColor={colors.palette.neutral400} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral750,
}

const $inputName: TextStyle = {
  paddingHorizontal: spacing.medium,

  color: colors.palette.neutral100,
  fontSize: 18,
}

const $inputContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1,
  borderColor: colors.palette.neutral600,
  paddingHorizontal: spacing.medium,
  backgroundColor: colors.palette.secondary600,
}
const $categoryContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: spacing.medium,
}
const $sections: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $sectionContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $sectionText: ViewStyle = {
  justifyContent: "center",
  borderBottomWidth: 1,
  width: "100%",
  marginLeft: spacing.medium,
  paddingVertical: spacing.small,
  borderColor: colors.palette.neutral600,

}

const $sectionTime: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderBottomWidth: 1,
  width: "100%",
  marginLeft: 46,
  paddingVertical: spacing.medium,
  borderColor: colors.palette.neutral600,
}

