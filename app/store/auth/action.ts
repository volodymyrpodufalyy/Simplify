import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { StorageKey } from "../../common/enums/enums"
import { AsyncThunkConfig } from "../store"
import { UserSignUpRequest } from "../../common/types/UserSignUpRequest"

const signUp = createAsyncThunk<any, UserSignUpRequest, AsyncThunkConfig>(ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {

    const { authApi } = extra

    const user = await authApi.signUp(registerPayload)

    return {  }
  })


export { signUp }
