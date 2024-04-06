'use client'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import storageSession from 'redux-persist/lib/storage/session'
import pokemonReducer from './features/pokemon-list/pokemonSlice'
import searchReducer from './features/search-bar/searchpokemonSlice'
import pointsReducer from './features/points-game2/pointsgame2slice'
import usernameReducer from './features/userinfo/usernameslice'
import storage from 'redux-persist/lib/storage'
import signupsuccessReducer from './features/userinfo/usernameslice'

// Combine reducers
const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  search: searchReducer,
  points: pointsReducer,
  username: usernameReducer,
  signupsuccess: signupsuccessReducer,
})

// Configure persist reducer
const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
})

// Export the store and types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create persistor for use in _app.tsx
export const persistor = persistStore(store)
