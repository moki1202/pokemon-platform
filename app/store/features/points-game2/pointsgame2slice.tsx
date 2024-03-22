'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

// Define the interface for points state
interface PointsState {
  points: number
  correctPokemonNumber: string
  imageUrl: string
}

// Define the initial state
const initialState: PointsState = {
  points: 0,
  correctPokemonNumber: '',
  imageUrl: '',
}

// Create a slice for points
const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    // Action to update points
    updatePoints(
      state,
      action: PayloadAction<{
        points: number
        correctPokemonNumber: string
        imageUrl: string
      }>
    ) {
      state.points = action.payload.points
      state.correctPokemonNumber = action.payload.correctPokemonNumber
      state.imageUrl = action.payload.imageUrl
    },
    // Action to reset points
    resetPoints(state) {
      state.points = 0
      state.correctPokemonNumber = ''
      state.imageUrl = ''
    },
  },
})

// Export action creators
export const { updatePoints, resetPoints } = pointsSlice.actions
export const selectPointsGame2 = (state: RootState) => state.points

// Export reducer
export default pointsSlice.reducer
