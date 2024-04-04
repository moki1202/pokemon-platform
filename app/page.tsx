'use client'
import { useEffect } from 'react'
import { AppDispatch } from './store/store'
import { useDispatch } from 'react-redux'
import { fetchPokemonData } from './store/features/pokemon-list/pokemonSlice'
import { useSelector } from 'react-redux'
import { selectPokemonData } from './store/features/pokemon-list/pokemonSlice'
import { useState } from 'react'
import LazyLoad from 'react-lazy-load'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const pokemonData = useSelector(selectPokemonData)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPokemonData())
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    if (pokemonData.length === 0) {
      fetchData()
    } else {
      setIsLoading(false)
    }
  }, [dispatch, pokemonData.length])
  return (
    <>
      <div className='h-screen main-2'>
        <div className='w-full main h-screen flex items-center justify-center '>
          {isLoading && (
            <LazyLoad height={400} offset={100}>
              <div className='lazy-loader'></div>
            </LazyLoad>
          )}
        </div>
      </div>
    </>
  )
}
