'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { selectPointsGame2 } from '@/app/store/features/points-game2/pointsgame2slice'
import { useSelector } from 'react-redux'
import Card from '@/components/pokemoncard'

const CongratulationsPage: React.FC = () => {
  const router = useRouter()
  const object = useSelector(selectPointsGame2)
  const points = object?.points
  const correctPokemonName = object?.correctPokemonNumber
  const url = object.imageUrl

  const handleClick = () => {
    if (object.gameType == 2) {
      router.push('/pokemon-scribble')
    } else if (object.gameType == 1) {
      router.push('/how-to-play')
    }
  }
  return (
    <>
      <div className='congratulations-container py-[120px]'>
        <div className='congratulations-text'>
          <h2>Sorry Wrong Answer: You've won {points} points &#128577;</h2>
        </div>
        <div>
          The Correct Answer is {correctPokemonName?.toUpperCase()}
          <Card image={url} name={correctPokemonName} />
        </div>
        <div>
          <button
            onClick={handleClick}
            className='button-color rounded-full w-[8rem] h-[3rem] font-bold'
          >
            &#8634; Play Again
          </button>
        </div>
      </div>
    </>
  )
}

export default CongratulationsPage
