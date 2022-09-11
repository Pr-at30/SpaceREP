import { configureStore } from '@reduxjs/toolkit'
import authReducers from '../features/auth/authSlice'
import deckReducers from '../features/deck/deckSlice'
import cardReducers from '../features/card/cardSlice'


export const store = configureStore({
  reducer: {
    auth : authReducers,
    deck : deckReducers,
    card:cardReducers ,
  },
})  