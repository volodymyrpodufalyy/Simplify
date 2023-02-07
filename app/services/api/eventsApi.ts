import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import User = FirebaseAuthTypes.User
import QueryDocumentSnapshot = FirebaseFirestoreTypes.QueryDocumentSnapshot

export const mapDocToEvent = (doc: QueryDocumentSnapshot, arr: Event[]) => arr.push(doc.data() as Event)

export class EventsApi {
  
  public async fetchEvents(user: User): Promise<Event[]> {
    const result: Event[] = []
    const events = await firestore().collection("events").where("userId", "==", user.uid).get()
    events.forEach((value) => mapDocToEvent(value, result))
    return result
  }
  
  public async addEvent(user: User, event: Event) {
    await firestore()
      .collection("events")
      .add(event)
  }
  
  public async updateEvent(user: User, eventId: string, updatedEvent: Event) {
    await firestore()
      .collection("events")
      .doc(eventId)
      .update(updatedEvent)
  }
}


export default new EventsApi()