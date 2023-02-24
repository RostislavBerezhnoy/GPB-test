import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { CalendarEventsDto } from 'types/api'
import { FAKE_API_URL } from 'config/api'

export const CALENDAR_TYPE = 'CALENDAR_TYPE'

export const CalendarQueries = createApi({
  reducerPath: CALENDAR_TYPE,
  baseQuery: fetchBaseQuery({
    baseUrl: FAKE_API_URL,
    mode: 'cors',
  }),
  tagTypes: [CALENDAR_TYPE],
  endpoints: build => ({
    getCalendarEventsList: build.query<CalendarEventsDto[], void>({
      query: () => ({
        url: '/calendar',
        method: 'GET',
      }),
    }),
  }),
})
