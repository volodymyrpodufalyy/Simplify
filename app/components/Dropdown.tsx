import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
} from "react-native"
import { Icon } from "./Icon"
import { spacing } from "../theme"


export const Dropdown = ({ setSelected, data }) => {


  const oldOption = React.useRef(null)
  const [_firstRender, _setFirstRender] = React.useState<boolean>(true)
  const [dropdown, setDropdown] = React.useState<boolean>(false)
  const [selectedval, setSelectedVal] = React.useState<any>("")
  const height = 200
  const animatedvalue = React.useRef(new Animated.Value(0)).current
  const [filtereddata, setFilteredData] = React.useState(data)


  const slidedown = () => {
    setDropdown(true)
    Animated.timing(animatedvalue, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,

    }).start()
  }
  const slideup = () => {

    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,

    }).start(() => setDropdown(false))
  }


  React.useEffect(() => {
    setFilteredData(data)
  }, [data])


  React.useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false)

    }

  }, [selectedval])







  return (
    <View style={{}}>

      <TouchableOpacity style={styles.wrapper}
                        onPress={() => {
                          if (!dropdown) {
                            slidedown()
                          } else {
                            slideup()
                          }
                        }}>
        <Text style={{ color: "white", fontSize: 18 }}>{(selectedval === "") ? "Select category" : selectedval}</Text>
        <Icon icon={"chevron"} color={"#ffffff"} size={25} />

      </TouchableOpacity>

      {
        (dropdown)
          ?
          <Animated.View style={[{ maxHeight: animatedvalue }, styles.dropdown]}>
            <ScrollView contentContainerStyle={{ overflow: "hidden" }} nestedScrollEnabled={true}>

              {
                (filtereddata.length >= 1)
                  ?
                  filtereddata.map((item, index: number) => {
                    const value = item.value ?? item
                    return (
                      <TouchableOpacity style={styles.option} key={index} onPress={() => {
                        setSelected(value)
                        setSelectedVal(value)
                        slideup()
                        setTimeout(() => {
                          setFilteredData(data)
                        }, 800)

                      }}>
                        <Text style={{ color: "#ffffff", fontSize: 18 }}>{value}</Text>
                      </TouchableOpacity>
                    )
                  })

                  :
                  null
              }
              <View style={[styles.addCategory]}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>

                  <Icon icon={"plus"} color={"white"} size={20} />
                  <Text style={{ color: "white", fontSize: 18, paddingLeft: 10 }}>Add a new category</Text>

                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
          :
          null
      }
    </View>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.medium,
    paddingRight: 10,
  },
  dropdown: {
    overflow: "hidden",
  },
  option: {
    paddingVertical: spacing.small,
    overflow: "hidden",
    color: "white",
  },

  addCategory: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "white",
    marginTop: 5,
    paddingVertical: spacing.small,
    alignItems: "center",
  },
})
