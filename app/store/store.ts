'use client'
import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './features/pokemon-list/pokemonSlice'
import searchReducer from './features/search-bar/searchpokemonSlice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
