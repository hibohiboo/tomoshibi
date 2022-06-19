import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  useSql: false,
}

export const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {},
})
