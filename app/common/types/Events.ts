import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import Timestamp = FirebaseFirestoreTypes.Timestamp

export enum EventCategory {
  BirthDay = "Birthday",
  WorkMeeting = "Work meeting",
  DoctorAppointment = "Doctor Appointment",
  Training = "Gym training",
  Rest = "Rest"
}

export interface Event {
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  userId: string;
  category?: EventCategory;
  people: string[];
  files: string[];
}