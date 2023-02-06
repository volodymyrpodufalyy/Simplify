import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { StorageKey } from "../../common/enums/enums"
import { AsyncThunkConfig } from "../store"
import { UserSignUpRequest } from "../../common/types/UserSignUpRequest"

const signUp = createAsyncThunk<any, UserSignUpRequest, AsyncThunkConfig>(ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {

    const { authApi } = extra
    let errorMsg = ""
    if (registerPayload.email.length === 0) errorMsg = "can't be blank"
    if (registerPayload.email.length < 6) errorMsg = "must be at least 6 characters"

    try {
      const res = await authApi.signUp(registerPayload)
      return { user: res, error: null }
    } catch (e) {
      return {
        user: null, error: {
          name: e,
          errorMsg: errorMsg,
        },
      }
    }


  })


export { signUp }
