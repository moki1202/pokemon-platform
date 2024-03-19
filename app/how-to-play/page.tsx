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
  const [buttonText, setButtonText] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerInput(event.target.value)
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNo}/`
  const filteredData = (pokemonData as any[]).filter(
    (item: { url: string }) => item.url === url
  )
  const handleSearch = () => {
    if (filteredData[0]?.name === playerInput) {
      console.log(`Congratulations you win`)
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
    const randomIndex = Math.floor(Math.random() * 151) + 1
    setPokemonNo(randomIndex)
  }, [])

  const pokemon1: string = `/assets/images/svg/${pokemonNo}.svg`

  const handleButtonTextChange = (newButtonText: string) => {
    setButtonText(newButtonText)
  }

  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }
    return shuffledArray
  }
  //conditionally render all the options
  let shuffleOptions: string[] = []
  if (buttonText === `Let's Play`) {
    console.log('if is being fulfilled')
    const wrongItems = (pokemonData as any[])
      .filter((item: { url: string }) => item.url !== url)
      .map((item: { name: string }) => item.name)
    const shuffleArr = shuffleArray(wrongItems).slice(0, 4)
    const rightAns = filteredData.map((item: { name: string }) => item.name)
    const combinedOptions = [...rightAns, ...shuffleArr]
    shuffleOptions = shuffleArray(combinedOptions)
  }

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className='fusion-overlay flex max-w-sm w-max items-center justify-center px-2  flex-wrap py-4 relative'>
          <div className='fusion-container flex-col justify-center items-center object-contain mt-[20px] w-max-[100px] h-max-[100px]'>
            <PokemonFusion
              pokemon={pokemon1}
              onButtonTextChange={handleButtonTextChange}
            />
          </div>
          <div className='relative mt-[12rem]'>
            <input
              type='text'
              placeholder='Write Answer'
              className='flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500'
              value={playerInput}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        <div className='relative '>
          {shuffleOptions.length > 0 && (
            <div>
              {shuffleOptions.map((option, index) => (
                <div key={index}>{option}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='relative '>
        {shuffleOptions.length > 0 && (
          <div>
            {shuffleOptions.map((option, index) => (
              <div key={index}>{option}</div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default HowToPlay
