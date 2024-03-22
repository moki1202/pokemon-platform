'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectPokemonData } from '../store/features/pokemon-list/pokemonSlice'
import { useDispatch } from 'react-redux'
import { updatePoints } from '../store/features/points-game2/pointsgame2slice'

const Game: React.FC = () => {
  const pokemonData = useSelector(selectPokemonData)

  const [timeLeft, setTimeLeft] = useState(60)
  const [pokemonName, setPokemonName] = useState('')
  const [revealedLetters, setRevealedLetters] = useState<Array<string>>(
    Array(pokemonName.length).fill('')
  )
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [pokemonNo, setPokemonNo] = useState<number>(0)
  const [pokemonImageClass, setPokemonImageClass] =
    useState<string>('black-pokemon-img')

  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [guessedAns, setGuessedAns] = useState<boolean | null>(null)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (gameStarted) {
      // Start the timer
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)

      const randomIndex = Math.floor(Math.random() * 151) + 1
      setPokemonNo(randomIndex)

      // Select a random Pokémon name
      const url: string = `https://pokeapi.co/api/v2/pokemon/${randomIndex}/`
      const filteredData = (pokemonData as any[]).filter(
        (item: { url: string }) => item.url === url
      )
      const pokemonName = filteredData[0]?.name.toLowerCase()
      // const pokemonName = 'bulbasaur'
      setPokemonName(pokemonName)

      // Set up intervals to gradually reveal letters
      const nameLength = pokemonName.length
      const interval = Math.ceil(60 / nameLength)
      const intervalId = setInterval(() => {
        if (revealedIndices.size < nameLength) {
          let nextIndex: number
          do {
            nextIndex = Math.floor(Math.random() * pokemonName.length)
          } while (revealedIndices.has(nextIndex))

          setRevealedIndices(
            (prevIndices) => new Set(prevIndices.add(nextIndex))
          )
          setRevealedLetters((prevLetters) => {
            const updatedLetters = [...prevLetters]
            updatedLetters[nextIndex] = pokemonName[nextIndex]
            return updatedLetters
          })
        }
      }, interval * 1000)
      const revealImageTimer = setTimeout(() => {
        setPokemonImageClass('pokemon-img')
      }, 10000)

      return () => {
        clearInterval(timer)
        clearInterval(intervalId)
        clearTimeout(revealImageTimer)
      }
    }
  }, [gameStarted])

  useEffect(() => {
    if (guessedAns) {
      // Calculate points only when guessedAns updates
      const calculatedpoints = calculatePoints(timeLeft)
      dispatch(
        updatePoints({
          points: calculatedpoints,
          correctPokemonNumber: pokemonName,
          imageUrl: pokemonUrl,
        })
      )
    } else {
      dispatch(
        updatePoints({
          points: 0,
          correctPokemonNumber: pokemonName,
          imageUrl: pokemonUrl,
        })
      )
    }
  }, [guessedAns])

  const pokemonUrl: string = `/assets/images/svg/${pokemonNo}.svg`
  // const pokemonUrl: string = `/assets/images/svg/1.svg`

  const handleGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputElement = event.currentTarget.elements.namedItem(
      'guess'
    ) as HTMLInputElement
    const guess = inputElement.value.toLowerCase()

    if (timeLeft === 0) {
      router.push(`/failed`)
    } else if (guess === pokemonName.toLowerCase()) {
      setGuessedAns(true)
      router.push(`/extra-pages/congratulations`)
    } else {
      setGuessedAns(false)
      router.push(`/extra-pages/failed`)
    }
  }

  const calculatePoints = (leftTime: number): number => {
    if (leftTime <= 0 || !guessedAns) {
      // If time is up or guess is empty, award zero points
      return 0
    }
    const pointsMap = new Map<number, number>()
    pointsMap.set(10, 2)
    pointsMap.set(20, 3)
    pointsMap.set(30, 4)
    pointsMap.set(40, 5)
    pointsMap.set(50, 6)
    let points = 1

    pointsMap.forEach((value, key) => {
      if (leftTime >= key) {
        points = value
      }
    })
    return points
  }

  return (
    <>
      <div className='container flex py-[150px]'>
        {!gameStarted && (
          <button
            onClick={() => setGameStarted(true)}
            className='start-button'
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            Start
          </button>
        )}
        {gameStarted && (
          <>
            <div className='timer'>Time Left: {timeLeft} seconds</div>
            <div className='clue'>{revealedLetters}</div>
            <div className='image-container'>
              <img
                src={pokemonUrl}
                alt='Pokemon'
                className={pokemonImageClass}
              />
            </div>
            <form onSubmit={handleGuess} className='guess-form'>
              <input
                type='text'
                name='guess'
                required
                className='guess-input'
              />
              <button type='submit' className='submit-button'>
                Submit Guess
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default Game
