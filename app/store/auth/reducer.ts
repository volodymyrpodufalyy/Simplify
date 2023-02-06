import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from "../../common/enums/enums"
import { UserByIdResponse } from "../../common/types/UserByIdResponse"
import { signUp } from "./action"

type State = {
  dataStatus: DataStatus;
  user: UserByIdResponse | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

});

export { reducer };
