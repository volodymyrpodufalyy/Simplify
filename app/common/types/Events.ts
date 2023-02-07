import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

export enum EventCategory {
  BirthDay = "Birthday",
  WorkMeeting = "Work meeting",
  DoctorAppointment = "Doctor Appointment",
  Training = "Gym training",
  Rest = "Rest"
}

export interface Event {
  name: string;
  startDate: FirebaseFirestoreTypes.Timestamp;
  endDate: FirebaseFirestoreTypes.Timestamp;
  userId: string;
  category?: any;
  people: string[];
  files: string[];
}
