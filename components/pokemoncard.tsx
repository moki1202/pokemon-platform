'use client'
import React from 'react'
import { useState } from 'react'
import PokedexModal from './pokedexModals'

export interface Pokemon {
  name: string
  image: string
}

const Card: React.FC<Pokemon> = ({ name, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
    <div className='pokemon-card-container flex max-w-sm rounded shadow-xl m-4 opacity-80 hover:opacity-100 w-max items-center justify-center px-2 py-2' onClick={handleCardClick}>
      <div className='pokemon-card justify-center flex-between'>
        <img className='pokermon-img flex-grow' src={image} alt={name} />
        <div className='flex justify-center '>
          <div className=' font-bold text-xl mb-2'>{name.toUpperCase()}</div>
        </div>
      </div>
    </div>
    {isModalOpen && <PokedexModal onClose={() => setIsModalOpen(false)} name={name} image={image} />}
    </>
  );
}

export default Card
