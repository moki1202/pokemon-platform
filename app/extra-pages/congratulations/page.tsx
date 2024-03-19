'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const CongratulationsPage: React.FC = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/how-to-play')
  }

  return (
    <>
      <div className=''>
        <h1>Congratulations!</h1>
        <p>You've won 10 points!</p>
        <button onClick={handleClick}>Play Again</button>
      </div>
    </>
  )
}

export default CongratulationsPage
