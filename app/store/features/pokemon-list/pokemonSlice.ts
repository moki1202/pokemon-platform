'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import axios from 'axios' // Import Axios for making HTTP requests
import { totalPokemon } from '@/constants/totalPokemon'

interface PokemonState {
  data: any[]
  loading: boolean
  error: string | null
}

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchPokemonData = createAsyncThunk(
  'pokemon-list/fetch',
  async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}&offset=0`
      )
      return response.data.results
    } catch (err) {
      return (err as Error).message
    }
  }
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPokemonData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(fetchPokemonData.rejected, (state, action) => {})
  },
})

// Selector functions to access state slices
export const selectPokemonData = (state: RootState) => state.pokemon.data

export default pokemonSlice.reducer
