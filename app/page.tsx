'use client'
import { useEffect } from 'react'
import { AppDispatch } from './store/store'
import { useDispatch } from 'react-redux'
import { fetchPokemonData } from './store/features/pokemon-list/pokemonSlice'
import { useSelector } from 'react-redux'
import { selectPokemonData } from './store/features/pokemon-list/pokemonSlice'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const pokemonData = useSelector(selectPokemonData)
  useEffect(() => {
    if (!pokemonData) {
      dispatch(fetchPokemonData())
    }
  }, [dispatch, pokemonData])
  return (
    <>
      <div className='h-screen main-2'>
        <div className='w-full main h-screen'> </div>
      </div>
    </>
  )
}
