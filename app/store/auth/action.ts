import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { StorageKey } from "../../common/enums/enums"
import { AsyncThunkConfig } from "../store"
import { UserSignUpRequest } from "../../common/types/UserSignUpRequest"

const signUp = createAsyncThunk<any, UserSignUpRequest, AsyncThunkConfig>(ActionType.SIGN_UP,
  async (registerPayload, { extra }) => {

    const { authApi } = extra
    let emailErrorMsg = ""
    if (registerPayload.email.length === 0) emailErrorMsg = "can't be blank"
    if (registerPayload.email.length < 6) emailErrorMsg = "must be at least 6 characters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerPayload.email))
      emailErrorMsg = "must be a valid email address"

    let passwordErrorMsg = ""
    if (registerPayload.password.length === 0) passwordErrorMsg = "can't be blank"
    if (registerPayload.password.length < 6) passwordErrorMsg = "must be at least 6 characters"

    let payload = { user: null, error: null }

    if (emailErrorMsg !== "" || passwordErrorMsg !== "") {
      payload = {
        user: null, error: {
          name: "error",
          emailErrorMsg,
          passwordErrorMsg,
        },
      }
      return payload
    }

    try {
      const res = await authApi.signUp(registerPayload)
      payload = { user: res, error: null }
    } catch (e) {
      payload = {
        user: null, error: {
          name: e,
          emailErrorMsg: "user with this email is already exist",
          passwordErrorMsg,
        },
      }
    }

    return payload
  })

const signIn = createAsyncThunk<any, UserSignUpRequest, AsyncThunkConfig>(ActionType.SIGN_IN,
  async (registerPayload, { extra }) => {

    const { authApi } = extra
    let emailErrorMsg = ""
    if (registerPayload.email.length === 0) emailErrorMsg = "can't be blank"
    if (registerPayload.email.length < 6) emailErrorMsg = "must be at least 6 characters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerPayload.email))
      emailErrorMsg = "must be a valid email address"

    let passwordErrorMsg = ""
    if (registerPayload.password.length === 0) passwordErrorMsg = "can't be blank"
    if (registerPayload.password.length < 6) passwordErrorMsg = "must be at least 6 characters"

    let payload = { user: null, error: null }

    if (emailErrorMsg !== "" || passwordErrorMsg !== "") {
      payload = {
        user: null, error: {
          name: "error",
          emailErrorMsg,
          passwordErrorMsg,
        },
      }
      return payload
    }

    try {
      const res = await authApi.signIn(registerPayload)
      payload = { user: res, error: null }

    } catch (e) {

      payload = {
        user: null, error: {
          name: e,
          emailErrorMsg: "email or password is not correct",
          passwordErrorMsg,
        },
      }
    }

    return payload
  })

const clearErrors = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.CLEAR_ERROR,
  async (registerPayload, { extra }) => {

    return null
  })

const logOut = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOG_OUT,
  async (registerPayload, { extra }) => {

    const { authApi } = extra

    try {
      await authApi.signOut()
    } catch (e) {
      console.log(e)
    }
    return null
  })

const getCurrentUser = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.CURRENT_USER,
  async (registerPayload, { extra }) => {

    const { authApi } = extra

    try {
      return await authApi.getCurrentUser()
    } catch (e) {
      console.log(e)
    }
    return null
  })


export { signUp, clearErrors, logOut, signIn, getCurrentUser }
