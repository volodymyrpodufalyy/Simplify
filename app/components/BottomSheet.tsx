import React, { useCallback, useRef, useMemo, useEffect } from "react"
import {Dimensions, StyleSheet, View,
} from "react-native"
import { colors} from "../theme"
import { Text } from "./Text"

import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { useSharedValue } from "react-native-reanimated"


const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export function BottomSheetApp({setHeight}) {

  const sheetRef = useRef<BottomSheet>(null)

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  )

  // callbacks
  const handleSheetChange = useCallback((index) => {
    setHeight(index)
  }, [])



  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={{ color: colors.palette.neutral100 }}>{item}</Text>
      </View>
    ),
    [],
  )

  const sharedVal = useSharedValue(0);

  useEffect(()=>{
    console.log(sharedVal)
  },[sharedVal])

  return (

    <View style={styles.container}>
      <BottomSheet
        index={1}
        ref={sheetRef}
        snapPoints={["50%", "80%"]}
        onChange={handleSheetChange}
        handleStyle={styles.sheetContainer}
        animatedPosition={sharedVal}
        style={{backgroundColor:'transparent'}}
        backgroundStyle={{ backgroundColor:colors.palette.neutral750, borderRadius:30 }}
        handleIndicatorStyle={ {backgroundColor:colors.palette.neutral100}}
      >
        <View style={{ backgroundColor: colors.palette.neutral750, paddingHorizontal: 20 }}>
          <Text tx={"HomeScreen.upcoming"}
                style={{ color: colors.palette.neutral100 }}
                size={"md"}
          />
        </View>

        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    zIndex: 1,


  },
  contentContainer: {
    backgroundColor: colors.palette.neutral750,
  },
  itemContainer: {
    padding: 6,
    marginLeft: "20%",
    marginRight: 10,
    marginTop: 15,
    height: 70,
    backgroundColor: colors.palette.secondary500,
    borderRadius: 15,
  },
  sheetContainer: {
    backgroundColor: colors.palette.neutral750,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
})
