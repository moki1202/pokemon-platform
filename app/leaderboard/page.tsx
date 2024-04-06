'use client'
import React, { useEffect, useState } from 'react'
import { getLeaderboard, LeaderboardEntry } from '../auth/supabase/getTopPoints'

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await getLeaderboard('guesspokemon')
      setLeaderboard(data)
    }

    fetchLeaderboard()
  }, [])

  return (
    <>
      <div className='py-[6rem]'>
        <h1>Leaderboard</h1>
        <div>
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={index}>
                {index + 1}. {entry.username}: {entry.points} points
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default LeaderboardPage
