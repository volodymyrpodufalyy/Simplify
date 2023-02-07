import { UserByIdResponse, UserSignUpRequest } from "../../common/types/types"
import auth from "@react-native-firebase/auth"

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
