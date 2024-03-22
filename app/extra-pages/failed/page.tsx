'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { selectPointsGame2 } from '@/app/store/features/points-game2/pointsgame2slice'
import { useSelector } from 'react-redux'
import Card from '@/components/pokemoncard'

const CongratulationsPage: React.FC = () => {
  const router = useRouter()
  const object = useSelector(selectPointsGame2)
  const points = object.points
  const correctPokemonName = object.correctPokemonNumber
  const url = object.imageUrl
  console.log(points)

  const handleClick = () => {
    router.push('/pokemon-scribble')
  }

  return (
    <>
      <div className='congratulations-container py-[50px]'>
        <div className='congratulations-text'>
          <h2>Sorry Wrong Answer</h2>
          <p>You've won {points} points &#128577;</p>
        </div>
        <div>
          The Correct Answer is {correctPokemonName}
          <Card image={url} name={correctPokemonName} />
        </div>
        <div>
          <button onClick={handleClick}>Play Again</button>
        </div>
      </div>
    </>
  )
}

export default CongratulationsPage
