import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { userConfigSlice } from './slices/userConfig'

export const store = configureStore({
  reducer: {
    userConfig: userConfigSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
