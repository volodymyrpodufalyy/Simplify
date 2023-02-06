import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from "./common"
import { StorageKey } from "../../common/enums/enums"
import { AsyncThunkConfig } from "../store"

const signUp = createAsyncThunk<any,any,AsyncThunkConfig>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  storage.setItem(StorageKey.TOKEN, token);
  return user;
});


export {signUp}
