import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import storage from "@react-native-firebase/storage"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

import { Event } from "../../common/types/types"
import { current } from "@reduxjs/toolkit"

type User = FirebaseAuthTypes.User
type QueryDocumentSnapshot = FirebaseFirestoreTypes.QueryDocumentSnapshot

type UserEmail = {
  email:'string',
  uid:'string'
}

export const mapDocToEvent = (doc: QueryDocumentSnapshot, arr: Event[]) => arr.push(doc.data() as Event)
export const mapDocToUser = (doc: QueryDocumentSnapshot, arr: UserEmail[]) => arr.push(doc.data() as UserEmail)

export class EventsApi {

  public async getEventById(id: string) {
    return await firestore().collection("events").doc(id).get()
  }

  public async fetchEvents(user: User): Promise<Event[]> {
    const result: Event[] = []
    const events = await firestore().collection("events").where("userId", "==", user.uid).get()
    events.forEach((value) => mapDocToEvent(value, result))
    return result
  }

  public async getNotMyEvents(user: User): Promise<Event[]> {
    const result: Event[] = []
    const events = await firestore().collection("events")
      .where("people",  "array-contains", user.email).get()
    events.forEach((value) => mapDocToEvent(value, result))

    return result
  }

  public async addEvent(event: Event) {
    await firestore()
      .collection("events")
      .add(event)
  }

  public async getUsers(): Promise<any> {
    let result: UserEmail[] = []
    const users = await firestore().collection("users").get()
    users.forEach(value=>mapDocToUser(value, result))
    const currentUserEmail = auth().currentUser.email
    result = result.filter(el=>el.email!==currentUserEmail)
    return result
  }

  public async updateEvent(eventId: string, updatedEvent: Event) {
    await firestore()
      .collection("events")
      .doc(eventId)
      .update(updatedEvent)
  }
  public async uploadFile(file) {
    console.log(file)
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
