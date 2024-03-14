import Card, { Pokemon } from '@/components/pokemoncard'
import React from 'react'

const PokemonPage = () => {
  const pokemons: Pokemon[] = [
    {
      name: 'Pikachu',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      type: 'Electric',
    },
    {
      name: 'Bulbasaur',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
      type: 'Grass',
    },
  ]
  return (
    <div className='container py-8 absolute mt-[50px]'>
      <h1 className='text-2xl font-bold mb-4 flex'>Pokemon List</h1>
      <div className='flex flex-grow'>
        {pokemons.map((pokemon, index) => (
          <Card key={index} {...pokemon} />
        ))}
      </div>
    </div>
  )
}
export default PokemonPage
