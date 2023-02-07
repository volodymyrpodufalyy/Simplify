import { UserByIdResponse, UserSignUpRequest } from "../../common/types/types"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

export class AuthApi {

  #apiPrefix: string

  // constructor() {
  //
  // }

  public async signUp(
    payload: UserSignUpRequest,
  ): Promise<any> {
    return auth().createUserWithEmailAndPassword(payload.email, payload.password)
  }

  public async addUserToCollection(
    payload: any,
  ): Promise<any> {
    const { email, uid } = payload.user

    await firestore().collection("users").doc(uid).set({
      email,
      uid,
    }).catch(() => {
      console.log("WTF!!!!!!!!!!")
    })

    return true
  }


  public async signIn(
    payload: UserSignUpRequest,
  ): Promise<any> {
    return auth().signInWithEmailAndPassword(payload.email, payload.password)
  }

  public async signOut(): Promise<any> {
    return await auth().signOut()
  }

  public async getCurrentUser(): Promise<any> {

    return auth().currentUser
  }
}
