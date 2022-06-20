import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

type AxiosParams = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}
const client = axios.create()
const axiosBaseQuery =
  (
    { baseUrl }: FetchBaseQueryArgs = { baseUrl: '' },
  ): BaseQueryFn<AxiosParams, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await client({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
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
      Record<string, string> // { from: string; to: string; users: string[] }
    >({
      query: (params) => ({ url: 'get-users-value', method: 'GET', params }),
    }),
  }),
})
export const { useGetValueQuery, useGetUsersValueQuery } = api
