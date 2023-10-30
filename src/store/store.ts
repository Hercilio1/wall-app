import { useDispatch } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import entryReducer from './reducers/entryReducer'
import profileReducer from './reducers/profileReducer'

const reducers = combineReducers({
  auth: authReducer,
  entries: entryReducer,
  profile: profileReducer,
})

export type RootState = ReturnType<typeof reducers>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

const store = configureStore({ reducer: reducers })

export default store
