'use client'
import { useEffect } from 'react'
import { AppDispatch } from './store/store'
import { useDispatch } from 'react-redux'
import { fetchPokemonData } from './store/features/pokemon-list/pokemonSlice'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPokemonData())
  }, [dispatch])
  return (
    <>
      <div className='h-screen main-2'>
        <div className='w-full main h-screen'> </div>
      </div>
    </>
  )
}
