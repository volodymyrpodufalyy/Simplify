import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { setCurrentEvent, uploadFile } from "./action"

type State = {
  dataStatus: DataStatus;
  event: any
  error: any
  uploadedFile: string|null
  currentEvent: any
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  event: null,
  uploadedFile: null,
  currentEvent: null,
  error: null,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(uploadFile.pending, (state) => {
    state.dataStatus = DataStatus.PENDING

  })
  builder.addCase(uploadFile.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
  })
  builder.addCase(setCurrentEvent.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.currentEvent = action.payload
  })
})

export { reducer }
