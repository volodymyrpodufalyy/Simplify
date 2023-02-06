import { UserByIdResponse, UserSignUpRequest } from "../../common/types/types"


export class AuthApi {

  #apiPrefix: string

  // constructor() {
  //
  // }

  public async signUp(
    payload: UserSignUpRequest,
  ): Promise<any> {
    console.log(payload)
    return { id: "", email: "" }
  }
}
