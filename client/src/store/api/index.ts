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
    { baseUrl, prepareHeaders }: FetchBaseQueryArgs = {
      baseUrl: '',
    },
  ): BaseQueryFn<AxiosParams, unknown, unknown> =>
  async ({ url, method, data, params }, api) => {
    try {
      const preparedHeaders =
        prepareHeaders == null
          ? new Headers({})
          : await prepareHeaders(new Headers({}), api)
      const headers: Record<string, string> = {}
      for (const [key, value] of preparedHeaders.entries()) {
        headers[key] = value
      }
      const result = await client({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
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
    prepareHeaders: (headers, api) => {
      api.getState()
      headers.set('x-api-key', 'todo')
      return headers
    },
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
    getUsersWithAUth: builder.query<
      { date: string; value: number; user: string }[],
      void
    >({
      query: () => ({
        url: 'get-value-with-auth',
        method: 'GET',
      }),
    }),
  }),
})
export const { useGetValueQuery, useGetUsersValueQuery } = api
