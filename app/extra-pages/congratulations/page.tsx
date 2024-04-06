'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { selectPointsGame2 } from '@/app/store/features/points-game2/pointsgame2slice'
import { useSelector } from 'react-redux'
import Card from '@/components/pokemoncard'
import { selectUsername } from '@/app/store/features/userinfo/usernameslice'
import { useState } from 'react'
import { updateGamePoints } from '@/app/auth/supabase/calculatePoints'

const CongratulationsPage: React.FC = () => {
  const router = useRouter()
  const object = useSelector(selectPointsGame2)
  const points = object.points
  const correctPokemonName = object.correctPokemonNumber
  const url = object.imageUrl
  const username = useSelector(selectUsername)

  const [gameName, setGameName] = useState<string>('')

  const handleClick = async () => {
    if (object.gameType == 'pokemonscribble') {
      router.push('/pokemon-scribble')
    } else if (object.gameType == 'guesspokemon') {
      router.push('/guess-that-pokemon')
    }

    const success = await updateGamePoints({
      username: username,
      points: points,
      gameType: object.gameType,
    })
    if (success) {
      console.log('Game points updated successfully')
    } else {
      console.error('Failed to update game points')
    }
  }

  return (
    <>
      <div className='congratulations-container py-[8rem]'>
        <div className='congratulations-text'>
          <h2>Congratulations!</h2>
          <p>You've won {points} points!</p>
        </div>
        <div>
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
