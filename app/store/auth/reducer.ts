import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"
import { UserByIdResponse } from "../../common/types/UserByIdResponse"
import { clearErrors, getCurrentUser, logOut, signIn, signUp } from "./action"
import { authApi } from "../../services/api"

type State = {
  dataStatus: DataStatus;
  user: UserByIdResponse | null;
  error: any
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  error: null,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(signUp.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.user = action.payload.user
    if(action.payload.user!==null){
      authApi.addUserToCollection(action.payload.user)
    }
    state.error = action.payload.error
  })
  builder.addCase(signIn.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.user = action.payload.user
    state.error = action.payload.error
  })
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED
  })
  builder.addCase(clearErrors.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.error = action.payload
  })
  builder.addCase(logOut.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.user = action.payload
  })
  builder.addCase(getCurrentUser.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.user = action.payload
  })
})

export { reducer }
