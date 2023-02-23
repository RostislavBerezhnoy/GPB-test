import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ServiceQueries } from 'api'

const rootReducer = combineReducers({
  [ServiceQueries.reducerPath]: ServiceQueries.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), ServiceQueries.middleware],
})
