/* eslint-disable @typescript-eslint/no-unused-vars,react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import { BackHandler, Dimensions, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import {
  Dropdown, Header, Icon,
  Text,
} from "../components"
import { colors, spacing } from "../theme"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { formatDate, formatHourMinutes, replaceTimeInDate } from "../utils/formatDate"
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
} from "react-native-document-picker"
import eventsApi from "../services/api/eventsApi"
import { Event, EventCategory } from "../common/types/types"
import { useAppDispatch, useAppSelector } from "../store/store"
import { dateToTimestamp, timestampToDate } from "../utils/date"
import { CATEGORIES } from "../common/constants"
import { addHours } from "date-fns"
import { setCurrentEvent } from "../store/event/action"


const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const AddNewEventScreen = ({ navigation }) => {
  const { currentEvent } = useAppSelector((state) => state.EventReducer)

  const dispatch = useAppDispatch()

  const category = CATEGORIES.map((value, index) => ({ key: index, value }))

  const { selectedDate } = useAppSelector(state => state.EventsReducer)

  const [selected, setSelected] = useState("")

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimeStart, setIsTimeStart] = useState(true)

  const [timeStart, setTimeStart] = useState(selectedDate)
  const [timeEnd, setTimeEnd] = useState(addHours(selectedDate, 1))

  const [date, setDate] = useState(selectedDate)
  const [name, setName] = useState("")

  const [file, setFile] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >()

  useEffect(() => {

    if (currentEvent) {
      setName(currentEvent.name)
      setSelected(currentEvent.category)
      setTimeStart(timestampToDate(currentEvent.startDate))
      setTimeEnd(timestampToDate(currentEvent.endDate))
      setDate(timestampToDate(currentEvent.startDate))

      if (currentEvent?.files[0]) {
        const name = currentEvent?.files[0].split("%2F")[1].split("?")[0]
        // @ts-ignore
        // setFile({name, size:12343})
      }
    }

  }, [currentEvent])
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const openFile = async () => {

  }
  const handleConfirmTime = (date) => {

    if (isTimeStart) {
      setTimeStart(date)
      if (date >= timeEnd) {
        const newDate = new Date(date)
        newDate.setHours(date.getHours() + 1)
        setTimeEnd(newDate)
      }

    } else {
      setTimeEnd(date)
      if (date <= timeStart) {
        const newDate = new Date(date)
        newDate.setHours(date.getHours() - 1)
        setTimeStart(newDate)
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

  const { user } = useAppSelector((state) => state.AuthReducer)

  const saveEvent = async () => {

    if (selected !== "" && name !== "") {

      let url = null
      if (file) {
        url = await eventsApi.uploadFile(file)
      }
      const event: Event = {
        category: selected,
        startDate: dateToTimestamp(replaceTimeInDate(date, timeStart)),
        endDate: dateToTimestamp(replaceTimeInDate(date, timeEnd)),
        files: url ? [url] : [],
        name,
        people: [],
        userId: user.uid,
      }

      if (currentEvent) {
        await eventsApi.updateEvent(currentEvent.key, event)
      } else {
        await eventsApi.addEvent(event)
      }


      navigation.navigate("Home")
    } else {
      name === "" ? alert("Name is required") : alert("Category is required")
    }

  }

  const backToHome = () => {
    dispatch(setCurrentEvent(null))
    navigation.navigate("Home")
  }

  BackHandler.addEventListener("hardwareBackPress", function() {
    dispatch(setCurrentEvent(null))
  })



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
              title={currentEvent ? "Your activity" : "New activity"}
              rightIcon={"check"}
              onRightPress={saveEvent}
              onLeftPress={backToHome}
              rightIconColor={colors.palette.neutral100}
              containerStyle={{ borderBottomWidth: 0.5, borderColor: colors.palette.neutral800 }}
              backgroundColor={colors.palette.secondary600} />
      <View style={$inputContainer}>
        <Icon icon={"play"} color={"white"} size={30} />
        <TextInput value={name} onChangeText={(e) => setName(e)} style={$inputName} placeholder={"What is planed?"}
                   placeholderTextColor={colors.palette.neutral400} />
      </View>
      <View style={$categoryContainer}>
        <Icon icon={"categories"} color={"white"} size={28} />
        <View style={$selectCategory}>
          <Dropdown data={category} setSelected={setSelected} selected={selected} />
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
              <Text text={formatHourMinutes(timeStart)} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
            <Text text={" - "} style={{ color: "white" }} size={"md"} />
            <TouchableOpacity onPress={pickEndTime}>
              <Text text={formatHourMinutes(timeEnd)} style={{ color: "white" }} size={"md"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={$sectionContainer}>
          <TouchableOpacity>
            <Icon icon={"calendar"} color={"white"} size={28} />
          </TouchableOpacity>
          <View style={$sectionText}>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <Text text={formatDate(date.toISOString())} style={{ color: "white" }} size={"md"} />
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
                  {/* @ts-ignore */}
                  <Text text={file.name} style={{ color: "white", maxWidth: 150 }} numberOfLines={1} size={"md"} />
                  {/* @ts-ignore */}
                  <Text text={(file.size * 0.001).toString() + " KB"} style={{ color: "white" }} size={"xs"} />
                </View>
                <TouchableOpacity onPress={() => {
                  setFile(null)
                }}>
                  <Icon icon={"cross"} size={20} color={"white"} style={{ marginLeft: 20 }} />
                </TouchableOpacity>

              </View>
            }
            {/* <Text style={{color:'white'}}>File uploaded</Text> */}
          </View>
        </View>
        {/* <TouchableOpacity style={$sectionContainer}> */}
        {/*   <Icon icon={"peoples"} color={"white"} size={30} /> */}
        {/*   <TextInput style={$inputName} placeholder={"Add peoples for event"} */}
        {/*              placeholderTextColor={colors.palette.neutral400} /> */}
        {/* </TouchableOpacity> */}
        <View style={$sectionContainer} >
          <Icon icon={"peoples"} color={"white"} size={30} />

          <View>

          </View>
        </View>
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

