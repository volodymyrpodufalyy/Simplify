import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { uploadFile } from "./action"

type State = {
  dataStatus: DataStatus;
  event: any
  error: any
  uploadedFile: string|null
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  event: null,
  uploadedFile: null,
  error: null,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(uploadFile.pending, (state) => {
    state.dataStatus = DataStatus.PENDING
    console.log('is pending' )
  })
  builder.addCase(uploadFile.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    console.log('is fulfilled' )
  })

})

export { reducer }
