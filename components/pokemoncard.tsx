// components/Card.js
import React from 'react'

export interface Pokemon {
  name: string
  image: string
}

const Card: React.FC<Pokemon> = ({ name, image }) => {
  return (
    <div className='pokemon-card-container '>
      <div className='pokemon-card max-w-sm rounded shadow-xl m-4 opacity-80 hover:opacity-100'>
        <img className='w-full' src={image} alt={name} />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{name}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
