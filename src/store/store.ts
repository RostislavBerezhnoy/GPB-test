import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ServiceQueries, CalendarQueries } from 'api'

const rootReducer = combineReducers({
  [ServiceQueries.reducerPath]: ServiceQueries.reducer,
  [CalendarQueries.reducerPath]: CalendarQueries.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    ServiceQueries.middleware,
    CalendarQueries.middleware,
  ],
})
