import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface EventsState {
  selectedDate: Date;
}

const initialState: EventsState = {
  selectedDate: new Date(),
}

export const eventsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDate } = eventsSlice.actions

export default eventsSlice.reducer