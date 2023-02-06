import React, { useState, useEffect } from "react"
import { Dimensions, Image, ImageStyle, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import {
  Button, Dropdown, Header, Icon,
  Text, TextField,
} from "../components"
import { colors, spacing } from "../theme"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { formatHourMinutes } from "../utils/formatDate"
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from "react-native-document-picker"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const AddNewEventScreen = ({ navigation }) => {

  const category = []

  const [selected, setSelected] = useState("")

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimeStart, setIsTimeStart] = useState(true)
  const [timeStart, setTimeStart] = useState("12:00")
  const [timeEnd, setTimeEnd] = useState("01:00")
  const [date, setDate] = useState(new Date())

  const [file, setFile] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >()

  const pickFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
        allowMultiSelection: false,
      })
      setFile(pickerResult)
    } catch (e) {
      console.log(e)
    }
  }

  const handleConfirmTime = (date) => {

    if (isTimeStart) {
      setTimeStart(formatHourMinutes(date))

      if (formatHourMinutes(date) >= timeEnd) {
        date.setHours(date.getHours() + 1)
        setTimeEnd(formatHourMinutes(date))
      }

    } else {
      setTimeEnd(formatHourMinutes(date))
      if (formatHourMinutes(date) <= timeStart) {
        date.setHours(date.getHours() - 1)
        setTimeStart(formatHourMinutes(date))

      }
    }
    setTimePickerVisibility(false)
  }
  const handleConfirmDate = (date) => {
    setDate(date)
    setDatePickerVisibility(false)
  }

  const pickStartTime = () => {
    setIsTimeStart(true)
    setTimePickerVisibility(true)
  }
  const pickEndTime = () => {
    setIsTimeStart(false)
    setTimePickerVisibility(true)
  }
  



  return (
    <View style={$container}>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
        locale="en_GB"
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        locale="en_GB"
      />
      <Header titleStyle={{ color: colors.palette.neutral100, fontSize: 18 }}
              leftTextStyle={{ color: colors.palette.neutral100 }}
              leftIcon={"caretLeft"}
              leftIconColor={colors.palette.neutral100}
              titleTx={"NewEventScreen.newActivity"}
              rightIcon={"check"}
              onRightPress={() => navigation.navigate("Home")}
              onLeftPress={() => navigation.navigate("Home")}
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
            <TouchableOpacity onPress={pickStartTime}>
              <Text text={timeStart} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
            <Text text={" - "} style={{ color: "white" }} size={"md"} />
            <TouchableOpacity onPress={pickEndTime}>
              <Text text={timeEnd} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={$sectionContainer}>
          <TouchableOpacity>
            <Icon icon={"calendar"} color={"white"} size={28} />
          </TouchableOpacity>
          <View style={$sectionText}>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <Text text={date.toLocaleDateString()} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={$sectionContainer}>
          <TouchableOpacity><Icon icon={"attach"} color={"white"} size={30} /></TouchableOpacity>
          <View style={$sectionText}>
            {!file ? <TouchableOpacity onPress={pickFile}>
                <Text tx={"NewEventScreen.attach"} style={{ color: "white" }} size={"md"} />
              </TouchableOpacity> :
              <View style={$file}>
                <Icon icon={"file"} size={40} color={"white"} style={{ marginRight: 10 }} />
                <View>
                  <Text text={file?.name} style={{ color: "white", maxWidth: 150 }} numberOfLines={1} size={"md"} />
                  <Text text={(file.size * 0.001).toString() + " KB"} style={{ color: "white" }} size={"xs"} />
                </View>
                <TouchableOpacity onPress={() => {
                  setFile(null)
                }}>
                  <Icon icon={"cross"} size={20} color={"white"} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
              </View>
            }
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

const $file: ViewStyle = {

  height: 50,

  maxWidth: 250,
  alignItems: "center",
  width: "100%",
  flexDirection: "row",
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

