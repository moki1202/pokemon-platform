'use client'
import Card, { Pokemon } from '@/components/pokemoncard'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPokemonData } from '../store/features/pokemon-list/pokemonSlice'
import ReactPaginate from 'react-paginate'

const ITEMS_PER_PAGE = 10
const PokemonPage = () => {
  const pokemonData = useSelector(selectPokemonData)
  const [currentPage, setCurrentPage] = useState(0)
  // const dispatch: AppDispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchPokemonData())
  // }, [dispatch])
  // // console.log(pokemonData)
  const handlePageChange = ({
    selected: selectedPage,
  }: {
    selected: number
  }) => {
    setCurrentPage(selectedPage)
  }

  const updatedPokemonData = (pokemonData as any[]).map((pokemon) => {
    const pokemonIndex =
      pokemon.url.split('/')[pokemon.url.split('/').length - 2]
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`
    return { ...pokemon, image }
  })
  const startIndex = currentPage * ITEMS_PER_PAGE
  const slicedData = updatedPokemonData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(updatedPokemonData.length / ITEMS_PER_PAGE)
  console.log(slicedData)

  return (
    <div className='container py-8 absolute mt-[70px] overflow-y-auto'>
      <h1 className='text-2xl font-bold mb-4 flex'>Pokemon List</h1>
      <div className='flex flex-wrap justify-center'>
        {(slicedData as any[]).map((pokemon, index) => (
          <div key={pokemon.name} className='w-1/5 p-4'>
            <Card key={index} {...pokemon} />
          </div>
        ))}
      </div>
      <div className='px-8'>
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
      </div>
    </div>
  )
}
export default PokemonPage
