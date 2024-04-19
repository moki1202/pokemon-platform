'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectSearchQuery } from '../store/features/search-bar/searchpokemonSlice'
import { selectPokemonData } from '../store/features/pokemon-list/pokemonSlice'
import Card from '@/components/pokemoncard'

const SearchResult = () => {
  const searchQuery = useSelector(selectSearchQuery)
  const pokemonData = useSelector(selectPokemonData)
  const updatedPokemonData = (pokemonData as any[]).map((pokemon) => {
    const pokemonIndex =
      pokemon.url.split('/')[pokemon.url.split('/').length - 2]
    const image = `/assets/images/svg/${pokemonIndex}.svg`
    return { ...pokemon, image }
  })
  const filteredPokemon = updatedPokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.query.toLowerCase())
  )
  return (
    <div className='container py-8 absolute mt-[8rem] overflow-y-auto'>
      <div className='flex flex-wrap justify-center items-center'>
        {(filteredPokemon as any[]).map((pokemon, index) => (
          <div key={pokemon.name} className='p-4'>
            <Card key={index} {...pokemon} />
          </div>
        ))}
      </div>
      {/* <div className='px-8'>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'rounded-half bg-blue-200 rounded-full'}
          className='flex justify-center space-x-3 mr-8'
          pageClassName={'inline-block mr-2'}
          pageLinkClassName={'px-3 py-2 border rounded-full'}
          // previousClassName={'inline-block mr-2'}
          // nextClassName={'inline-block mr-2'}
          previousLinkClassName={'px-3 py-2 border rounded-full italic'}
          nextLinkClassName={'px-3 py-2 border rounded-full italic'}
          // disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div> */}
    </div>
  )
}
export default SearchResult
