import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import storage from "@react-native-firebase/storage"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

import {Event} from "../../common/types/types"

type User = FirebaseAuthTypes.User
type QueryDocumentSnapshot = FirebaseFirestoreTypes.QueryDocumentSnapshot



export const mapDocToEvent = (doc: QueryDocumentSnapshot, arr: Event[]) => arr.push(doc.data() as Event)

export class EventsApi {

  public async fetchEvents(user: User): Promise<Event[]> {
    const result: Event[] = []
    const events = await firestore().collection("events").where("userId", "==", user.uid).get()
    events.forEach((value) => mapDocToEvent(value, result))
    return result
  }

  public async addEvent(event: Event) {
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
  public async uploadFile(file) {
    const reference = storage().ref(`files/${file.name}`);
    await reference.putFile(file.fileCopyUri)
    const url = await reference.getDownloadURL()

      // .on('state_changed',
      //   (snapshot) => {
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log('Upload is ' + progress + '% done');
      //     switch (snapshot.state) {
      //       case 'paused':
      //         console.log('Upload is paused');
      //         break;
      //       case 'running':
      //         console.log('Upload is running');
      //         break;
      //     }
      //   })

    return url
  }
}


export default new EventsApi()
