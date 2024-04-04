'use client'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setSearchQuery } from '@/app/store/features/search-bar/searchpokemonSlice'
import { useRouter } from 'next/navigation'

const SearchBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSearch = () => {
    dispatch(setSearchQuery(search))
    router.push('/search-result')
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  return (
    <div className='flex items-center bg-white bg-opacity-30 rounded-full p-1 text-white'>
      <input
        type='text'
        placeholder='Search Your Favourite Pokemon ...'
        className='flex-grow outline-none px-2 py-1 rounded-full bg-transparent'
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className='button-color text-white px-4 py-1 rounded-full ml-2'
      >
        Search
      </button>
    </div>
  )
}
export default SearchBar
