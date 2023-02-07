import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

export const timestampToDate = (timestamp: FirebaseFirestoreTypes.Timestamp) => timestamp.toDate()

export const dateToTimestamp = (date: Date) => firestore.Timestamp.fromDate(date)