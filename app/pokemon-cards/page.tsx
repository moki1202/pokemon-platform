'use client'
import Card from '@/components/pokemoncard'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPokemonData } from '../store/features/pokemon-list/pokemonSlice'
import ReactPaginate from 'react-paginate'

const ITEMS_PER_PAGE = 16
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
    const image = `/assets/images/svg/${pokemonIndex}.svg`
    return { ...pokemon, image }
  })
  const startIndex = currentPage * ITEMS_PER_PAGE
  const slicedData = updatedPokemonData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(updatedPokemonData.length / ITEMS_PER_PAGE)

  return (
    <div className='container py-8 absolute mt-[70px] overflow-y-auto'>
      <div className='flex flex-wrap justify-center'>
        {(slicedData as any[]).map((pokemon, index) => (
          <div key={pokemon.name} className='w-1/4 p-4'>
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
          activeClassName={' button-color rounded-full'}
          className='flex justify-center space-x-3 mr-8'
          pageClassName={'inline-block mr-2'}
          pageLinkClassName={'px-3 py-2 rounded-full'}
          // previousClassName={'inline-block mr-2'}
          // nextClassName={'inline-block mr-2'}
          previousLinkClassName={'px-3 py-2 button-color rounded-full italic'}
          nextLinkClassName={'px-3 py-2 rounded-full italic button-color'}
          // disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>
    </div>
  )
}
export default PokemonPage
