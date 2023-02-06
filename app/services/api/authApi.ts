import { UserByIdResponse, UserSignUpRequest } from "../../common/types/types"
import auth from '@react-native-firebase/auth';

export class AuthApi {

  #apiPrefix: string

  // constructor() {
  //
  // }

  public async signUp(
    payload: UserSignUpRequest,
  ): Promise<any> {

    auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        return { id: "", email: "" }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          throw Error( 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

  }
}
