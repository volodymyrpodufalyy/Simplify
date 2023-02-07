import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"

const uploadFile = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.FILE_UPLOAD,
  async (file, { extra }) => {

    const { eventsApi } = extra

    await eventsApi.uploadFile(file)

    return null
  })

const setCurrentEvent = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.GET_EVENT_BY_ID,
   (event) => {


    return event
  })

export { uploadFile,setCurrentEvent }
