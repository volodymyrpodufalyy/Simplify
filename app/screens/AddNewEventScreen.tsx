import React, { useState } from "react"
import { Dimensions, Image, ImageStyle, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import {
  Button, Dropdown, Header, Icon,
  Text, TextField,
} from "../components"
import { colors, spacing } from "../theme"
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const AddNewEventScreen = ({ navigation }) => {

  const category = [{ key: 1, value: "Work" },
    { key: 2, value: "School" },
    { key: 3, value: "Job1" },
    { key: 4, value: "Job2" },
    { key: 5, value: "Job3" },
    { key: 6, value: "Job4" },
    { key: 7, value: "Job5" },
    { key: 8, value: "Job6" },
  ]

  const [selected, setSelected] = useState("")

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState('1:00');

  const handleConfirm = (date) => {
    const minutes = date.getMinutes().toLocaleString()==='0'?'00':date.getMinutes().toLocaleString()
    setTime(date.getHours().toLocaleString()+':' + minutes  )
    setDatePickerVisibility(false)
  };

  return (
    <View style={$container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={()=>setDatePickerVisibility(false)}
        locale="en_GB"
      />
      <Header titleStyle={{ color: colors.palette.neutral100, fontSize: 18 }}
              leftTextStyle={{ color: colors.palette.neutral100 }}
              leftIcon={"caretLeft"}
              leftIconColor={colors.palette.neutral100}
              titleTx={"NewEventScreen.newActivity"}
              rightIcon={"check"}
              onRightPress={()=>navigation.navigate('Home')}
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
        <View style={$selectCategory}>
          <Dropdown data={category} setSelected={setSelected} search={false} />
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
            <TouchableOpacity onPress={()=>setDatePickerVisibility(true)}>
              <Text text={"1:00"} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
            <Text text={" - "} style={{ color: "white" }} size={"md"} />
            <TouchableOpacity>
              <Text text={"12:00"} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={$sectionContainer}>
          <TouchableOpacity>
            <Icon icon={"calendar"} color={"white"} size={28} />
          </TouchableOpacity>
          <View style={$sectionText}>
            <TouchableOpacity>
              <Text text={"Nov 1, 2023"} style={{ color: "white" }} size={"md"} />

            </TouchableOpacity>
          </View>
        </View>
        <View style={$sectionContainer}>
          <TouchableOpacity><Icon icon={"attach"} color={"white"} size={30} /></TouchableOpacity>
          <View style={$sectionText}>
            <TouchableOpacity>
              <Text tx={"NewEventScreen.attach"} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
          </View>
        </View>
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
  width: "100%",
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
  marginLeft: spacing.medium,
}
const $selectCategory: ViewStyle = {
  borderBottomWidth: 1,
  borderColor: colors.palette.neutral600,
  marginLeft: spacing.medium,
  alignSelf: "stretch",
  width: "100%",
  maxWidth: SCREEN_WIDTH - spacing.medium * 2 - 28,
}


const $sections: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const $sectionContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  maxWidth: SCREEN_WIDTH - spacing.medium * 2 - 28,
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

