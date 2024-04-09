'use client'
import React, { useEffect, useState } from 'react'
import { getLeaderboard, LeaderboardEntry } from '../auth/supabase/getTopPoints'

const LeaderboardPage: React.FC = () => {
  const [leaderboardGuess, setLeaderboardGuess] = useState<LeaderboardEntry[]>(
    []
  )
  const [leaderboardScribble, setLeaderboardScribble] = useState<
    LeaderboardEntry[]
  >([])

  useEffect(() => {
    async function fetchLeaderboard() {
      const data1 = await getLeaderboard('guesspokemon')
      const data2 = await getLeaderboard('pokemonscribble')
      setLeaderboardGuess(data1)
      setLeaderboardScribble(data2)
    }

    fetchLeaderboard()
  }, [])

  return (
    <>
      <div className='container-leaderboard text-black'>
        <h1 className='heading'>Leaderboard</h1>
        <div className='flex gap-[5rem] w-1/2'>
          <div className='card'>
            <h2 className='card-heading flex justify-center'>
              Guess That Pokemon
            </h2>
            <ul>
              {leaderboardGuess.map((entry, index) => (
                <li
                  key={index}
                  className='list-item items-center justify-between'
                >
                  <span>
                    {index + 1}. {entry.username}: {entry.points} points
                  </span>
                  {index + 1 <= 3 && (
                    <img
                      src={`/assets/logo/medal-${index + 1}.png`}
                      alt={`Medal ${index + 1}`}
                      className='w-6 h-6 mr-2'
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className='card'>
            <h2 className='card-heading flex justify-center'>
              Pokemon Scribble
            </h2>
            <ul>
              {leaderboardScribble.map((entry, index) => (
                <li
                  key={index}
                  className='list-item flex items-center justify-between'
                >
                  <span>
                    {index + 1}. {entry.username}: {entry.points} points
                  </span>
                  {index + 1 <= 3 && (
                    <img
                      src={`/assets/logo/medal-${index + 1}.png`}
                      alt={`Medal ${index + 1}`}
                      className='w-6 h-6 mr-2'
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeaderboardPage
