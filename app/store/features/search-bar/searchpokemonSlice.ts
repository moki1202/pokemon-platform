'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

// Define the initial state for search
interface SearchState {
  query: string
}

const initialState: SearchState = {
  query: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
  },
})

export const { setSearchQuery } = searchSlice.actions
export const selectSearchQuery = (state: RootState) => state.search

export default searchSlice.reducer
