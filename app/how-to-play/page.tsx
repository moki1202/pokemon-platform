'use client'
import React from 'react'
import PokemonFusion from '@/components/pokemon-fusion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPokemonData } from '../store/features/pokemon-list/pokemonSlice'
import { totalPokemon } from '@/constants/totalPokemon'
import { useRouter } from 'next/navigation'
import { updatePoints } from '../store/features/points-game2/pointsgame2slice'

const HowToPlay: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const pokemonData = useSelector(selectPokemonData)

  const [pokemonNo, setPokemonNo] = useState<number>(1)
  const [playerInput, setPlayerInput] = useState<string>('')
  const [play, setPlay] = useState<boolean>(false)
  const [count, setCount] = useState<number>(1)
  const [isGuessCorrect, setIsGuessCorrect] = useState<boolean | null>(null)
  const [pokemonName, setPokemonName] = useState<string>('')
  const [hints, setHints] = useState<string[]>([])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerInput(event.target.value)
  }
  const handleSearch = () => {
    if (pokemonName.toLowerCase() == playerInput.toLowerCase()) {
      setIsGuessCorrect(true)
    } else {
      setIsGuessCorrect(false)
    }
  }
  const pokemonUrl: string = `/assets/images/svg/${pokemonNo}.svg`
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    if (isGuessCorrect) {
      // Calculate points only when guessedAns updates
      const calculatedpoints: number = expectedPoints(count)
      dispatch(
        updatePoints({
          points: calculatedpoints,
          correctPokemonNumber: pokemonName,
          imageUrl: pokemonUrl,
          gameType: 1,
        })
      )
      router.push('/extra-pages/congratulations')
    } else if (isGuessCorrect != null) {
      dispatch(
        updatePoints({
          points: 0,
          correctPokemonNumber: pokemonName,
          imageUrl: pokemonUrl,
          gameType: 1,
        })
      )
      router.push('/extra-pages/failed')
    }
  }, [isGuessCorrect])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * totalPokemon) + 1
    setPokemonNo(randomIndex)
    const url: string = `https://pokeapi.co/api/v2/pokemon/${randomIndex}/`
    const filteredData = (pokemonData as any).filter(
      (item: { url: string }) => item.url === url
    )
    const pokemonName = filteredData[0]?.name.toLowerCase()
    setPokemonName(pokemonName)
  }, [])
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

  const handlePlayClick = () => {
    setPlay(true)
  }

  const handleCountChange = (newCount: number) => {
    setCount(newCount)
  }

  const pointsMap = new Map<number, number>()
  pointsMap.set(6, 1)
  pointsMap.set(5, 2)
  pointsMap.set(4, 3)
  pointsMap.set(3, 4)
  pointsMap.set(2, 5)
  pointsMap.set(1, 6)
  const expectedPoints = (totalHints: number): number => {
    if (!isGuessCorrect) return 0

    let points = 1
    pointsMap.forEach((key, value) => {
      if (totalHints == key) {
        points = value
      }
    })
    return points
  }
  const shuffleHints = (): string[] => {
    // Shuffle pokemonData array
    const copiedData = [...pokemonData]
    const shuffledData = (copiedData as []).sort(() => Math.random() - 0.5)

    // Select first four elements as incorrect hints
    const incorrectHints = shuffledData
      .slice(0, 4)
      .map((item: any) => item.name)

    // Add correct Pokemon name
    const correctHint = pokemonName

    // Combine incorrect hints with correct hint
    const hints = [...incorrectHints, correctHint]

    // Shuffle the hints array
    const shuffledHints = hints.sort(() => Math.random() - 0.5)

    return shuffledHints
  }

  useEffect(() => {
    // Call shuffleHints function when component mounts
    if (pokemonName) {
      const shuffledHints = shuffleHints()
      setHints(shuffledHints)
    }
  }, [pokemonName])

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        {play ? (
          <div className='fusion-overlay flex items-center justify-center px-2 flex-wrap py-4'>
            <div className='z-10'>Potential Points: {pointsMap.get(count)}</div>
            <div className='fusion-container flex justify-center items-center mt-[3rem]'>
              <PokemonFusion
                pokemon={pokemonUrl}
                totalCount={handleCountChange}
              />
            </div>
            <div className='flex items-center justify-center ml-[12rem] w-[15rem]'>
              <input
                type='text'
                placeholder='Write Answer'
                className='flex-grow px-4 py-2 rounded-full text-white bg-gray-500 write-answer'
                value={playerInput}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className='flex'>
              {hints.map((hint, index) => (
                <div key={index} className='p-6'>
                  {hint}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={handlePlayClick}
            className='button-color font-bold py-2 px-4 rounded-full w-[100px]'
          >
            Play
          </button>
        )}
      </div>
    </>
  )
}

export default HowToPlay
