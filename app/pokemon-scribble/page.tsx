'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectPokemonData } from '../store/features/pokemon-list/pokemonSlice'

const Game: React.FC = () => {
  const pokemonData = useSelector(selectPokemonData)

  const [timeLeft, setTimeLeft] = useState(60)
  const [pokemonName, setPokemonName] = useState('')
  const [revealedLetters, setRevealedLetters] = useState<Array<string>>(Array(pokemonName.length).fill(''));
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [pokemonNo, setPokemonNo] = useState<number>(0)
  const [pokemonImageClass, setPokemonImageClass] = useState<string>('black-pokemon-img')

  const router = useRouter()

  useEffect(() => {
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
    setPokemonName(pokemonName)

    // Set up intervals to gradually reveal letters
    const nameLength = pokemonName.length
    const interval = Math.ceil(60 / nameLength)
    let revealedLength = 0
    const intervalId = setInterval(() => {
      if (revealedIndices.size < nameLength) {
        let nextIndex: number;
        do {
          nextIndex = Math.floor(Math.random() * pokemonName.length);
        } while (revealedIndices.has(nextIndex));
        
        setRevealedIndices(prevIndices => new Set(prevIndices.add(nextIndex)));
        setRevealedLetters(prevLetters => {
          const updatedLetters = [...prevLetters];
          updatedLetters[nextIndex] = pokemonName[nextIndex];
          return updatedLetters;
        });
      }
    }, interval * 1000);
    const revealImageTimer = setTimeout(() => {
      setPokemonImageClass('pokemon-img')
    }, 10000)

    return () => {
      clearInterval(timer)
      clearInterval(intervalId)
      clearTimeout(revealImageTimer)
    }
  }, [])
  console.log(timeLeft)
  if (timeLeft == 0) {
    router.push(`/failed`)
  }
  const pokemonUrl: string = `/assets/images/svg/${pokemonNo}.svg`

  const handleGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputElement = event.currentTarget.elements.namedItem(
      'guess'
    ) as HTMLInputElement
    const guess = inputElement.value.toLowerCase()

    if (guess === pokemonName.toLowerCase()) {
      router.push(`/congratulations`)
    } else {
      console.log('Incorrect guess. Try again!')
    }
  }

  return (
    <>
      <div className='container flex py-[150px]'>
        <div className='timer'>Time Left: {timeLeft} seconds</div>
        <div className='clue'>{revealedLetters}</div>
        <div className='image-container'>
          <img src={pokemonUrl} alt='Pokemon' className={pokemonImageClass} />
        </div>
        <form onSubmit={handleGuess} className='guess-form'>
          <input type='text' name='guess' required className='guess-input' />
          <button type='submit' className='submit-button'>
            Submit Guess
          </button>
        </form>
      </div>
    </>
  )
}

export default Game
