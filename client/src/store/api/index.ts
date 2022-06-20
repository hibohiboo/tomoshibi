import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    getValue: builder.query<
      { date: string; value: number }[],
      { from: string; to: string }
    >({
      query: (params) => ({ url: 'get-value', method: 'GET', params }),
    }),
    getUsersValue: builder.query<
      { date: string; value: number; user: string }[],
      { from: string; to: string; users: string[] }
    >({
      query: (params) => ({ url: 'get-users-value', method: 'GET', params }),
    }),
    getUsersValue2: builder.query<
      { date: string; value: number; user: string }[],
      { from: string; to: string; users: string[] }
    >({
      query: (params) => ({ url: 'get-users-value', method: 'GET', params }),
    }),
  }),
})
export const { useGetValueQuery, useGetUsersValueQuery } = api
