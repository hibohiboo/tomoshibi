import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { api } from './api'
import { userConfigSlice } from './slices/userConfig'

export const store = configureStore({
  reducer: {
    userConfig: userConfigSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
})

// middlewareをいれないと、次のWarningが出る。
// react_devtools_backend.js:4026 Warning: Middleware for RTK-Query API at reducerPath "api" has not been added to the store.Features like automatic cache collection, automatic refetching etc. will not be available.

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
