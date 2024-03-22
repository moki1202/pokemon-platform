// components/Card.js
import React from 'react'

export interface Pokemon {
  name: string
  image: string
}

const Card: React.FC<Pokemon> = ({ name, image }) => {
  return (
    <div className='pokemon-card-container flex max-w-sm rounded shadow-xl m-4 opacity-80 hover:opacity-100 w-max items-center justify-center px-2 py-2'>
      <div className='pokemon-card justify-center flex-between'>
        <img className='pokermon-img flex-grow' src={image} alt={name} />
        <div className='flex justify-center '>
          <div className=' font-bold text-xl mb-2'>{name.toUpperCase()}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
