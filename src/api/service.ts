import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { preparedBaseQuery } from 'utils/preparedBaseQuery'
import { ServiceDto } from 'types/api'

export const SERVICE_TYPE = 'SERVICE_TYPE'

export const ServiceQueries = createApi({
  reducerPath: SERVICE_TYPE,
  baseQuery: preparedBaseQuery,
  tagTypes: [SERVICE_TYPE],
  endpoints: build => ({
    getServiceList: build.query<ServiceDto[], void>({
      query: () => ({
        url: '/services',
        method: 'GET',
      }),
    }),
  }),
})
