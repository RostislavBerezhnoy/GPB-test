import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { preparedBaseQueryFn } from 'utils/preparedBaseQuery'
import { EventDto, CreateEventDto } from 'types/api'
import { FAKE_API_URL } from 'config/api'

export const CALENDAR_TYPE = 'CALENDAR_TYPE'
export const CALENDAR_TYPE_GET_ALL_EVENTS = 'CALENDAR_TYPE_GET_ALL_EVENTS'

export const CalendarQueries = createApi({
  reducerPath: CALENDAR_TYPE,
  baseQuery: preparedBaseQueryFn(FAKE_API_URL),
  tagTypes: [CALENDAR_TYPE, CALENDAR_TYPE_GET_ALL_EVENTS],
  endpoints: build => ({
    getCalendarEventsList: build.query<EventDto[], void>({
      query: () => ({
        url: '/calendar',
        method: 'GET',
      }),
      providesTags: [CALENDAR_TYPE_GET_ALL_EVENTS],
    }),
    getCalendarEventById: build.query<EventDto, number>({
      query: id => ({
        url: `/calendar/${id}`,
        method: 'GET',
      }),
    }),
    createCalendarEvent: build.mutation<EventDto, CreateEventDto>({
      query: body => ({
        url: '/calendar',
        method: 'POST',
        body,
      }),
      invalidatesTags: [CALENDAR_TYPE_GET_ALL_EVENTS],
    }),
    updateCalendarEvent: build.mutation<EventDto, EventDto>({
      query: ({ id, ...body }) => ({
        url: `/calendar/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [CALENDAR_TYPE_GET_ALL_EVENTS],
    }),
    deleteCalendarEvent: build.mutation<void, number>({
      query: id => ({
        url: `/calendar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [CALENDAR_TYPE_GET_ALL_EVENTS],
    }),
  }),
})
