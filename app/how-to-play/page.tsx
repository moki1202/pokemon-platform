'use client'
import React from 'react'
import PokemonFusion from '@/components/pokemon-fusion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPokemonData } from '../store/features/pokemon-list/pokemonSlice'

const HowToPlay: React.FC = () => {
  const pokemonData = useSelector(selectPokemonData)

  const [pokemonNo, setPokemonNo] = useState<number>(1)
  const [playerInput, setPlayerInput] = useState<string>('')

  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 151) + 1
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerInput(event.target.value)
  }
  const handleSearch = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNo}/`
    const filteredData = (pokemonData as any[]).filter(
      (item: { url: string }) => item.url === url
    )
    if (filteredData[0].name === playerInput) {
      console.log(`COngratulations you win`)
    } else {
      console.log(`Try Again`)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    setPokemonNo(generateRandomNumber)
  }, [])

  useEffect(() => {
    const audio = new Audio('/assets/audio/pokemon-game-sound.mp3')
    audio.play()
  }, [])

  const pokemon1: string = `/assets/images/svg/${pokemonNo}.svg`

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className='fusion-overlay flex max-w-sm w-max items-center justify-center px-2 flex-grow flex-wrap'>
          <div className='fusion-container flex-col justify-center'>
            <PokemonFusion pokemon={pokemon1} />
          </div>
        </div>
      </div>
      <div>
        <input
          type='text'
          placeholder='Search...'
          className='flex-grow outline-none px-2 py-1 rounded-full'
          value={playerInput}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    </>
  )
}

export default HowToPlay
