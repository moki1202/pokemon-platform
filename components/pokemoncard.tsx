// components/Card.js
import React from 'react'

export interface Pokemon {
  name: string
  image: string
  type: string
}
const Card: React.FC<Pokemon> = ({ name, image, type }) => {
  return (
    <div className='pokemon-cards max-w-sm rounded shadow-xl m-4 filter drop-shadow-blue '>
      <img className='w-full' src={image} alt={name} />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{name}</div>
        <p className='text-gray-700 text-base'>{type}</p>
      </div>
    </div>
  )
}

export default Card
