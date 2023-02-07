import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { colors, spacing } from "../theme"
import { MultiSelect } from "react-native-element-dropdown"


export const DropdownMultiSelect = ({users,selected, setSelected }) => {
  const data = users.map((el)=>({label:el.email,value: el.email}))

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <MultiSelect
        statusBarIsTranslucent={true}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={styles.selectedStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={styles.itemContainerStyle}
        containerStyle={styles.containerStyle}
        maxHeight={200}
        data={data}
        activeColor={colors.palette.neutral600}
        labelField="label"
        valueField="value"
        placeholder="Add peoples for event"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={(item) => {
          setSelected(item)
        }}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
        confirmSelectItem
        confirmUnSelectItem
        onConfirmSelectItem={(item) => {
          setSelected(item)
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginLeft: spacing.medium,
    paddingRight: spacing.medium,
    width: "100%",
  },
  dropdown: {
    backgroundColor: colors.palette.neutral750,
    padding: 0,
  },
  selectedStyle:{
    backgroundColor:colors.palette.neutral750
  },
  containerStyle:{
    backgroundColor: colors.palette.neutral750,
  },
  itemContainerStyle: {
    backgroundColor: colors.palette.neutral750,
    borderWidth:0,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.palette.neutral100,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    padding: 0,
    fontSize: 16,
    backgroundColor: colors.palette.neutral750,
    borderWidth:0,

    color:'white',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: colors.palette.neutral200,
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
})
