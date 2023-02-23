import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { API_URL } from 'config/api'

export const preparedBaseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: API_URL,
  mode: 'cors',
})
