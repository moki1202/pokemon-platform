'use client'
import Link from 'next/link'
import SearchBar from './searchbar'
import { useRouter } from 'next/navigation'
import { Option } from './dropdown'
import { useState } from 'react'
import DropdownMenu from './dropdown'

export const Navbar = () => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleGameClick = () => {
    setShowDropdown(!showDropdown)
  }

  const handleGameSelect = (route: string) => {
    router.push(route)
    setShowDropdown(false)
  }

  const gameOptions: Option[] = [
    { label: 'Game 1', route: '/how-to-play' },
    { label: 'Game 2', route: '/pokemon-scribble' },
  ]
  const handleSearch = () => {
    router.push('auth/login')
  }
  return (
    <nav>
      <div className='navbar py-4 px-2 flex w-full justify-between items-center text-white fixed bg-opacity-100 z-50'>
        <Link href='/' className='flex-grow ml-4'>
          Home
        </Link>
        <div className='flex-grow mr-20'>
          <SearchBar />
        </div>
        <div className='relative flex-grow'>
          <button onClick={handleGameClick} className='flex-grow'>
            Games
          </button>
          {showDropdown && (
            <DropdownMenu options={gameOptions} onSelect={handleGameSelect} />
          )}
        </div>
        <Link href='/pokemon-cards' className='flex-grow'>
          PokeDoc
        </Link>
        <Link href='/pokemon-scribble' className='flex-grow'>
          leaderboard
        </Link>
        <div className='flex mr-4 justify-center items-center'>
          <Link href='/link-to-github' className='flex-grow'>
            GitHub
          </Link>
          <img src='/assets/logo/github.svg' className='px-2 ' />
        </div>
        <button
          onClick={handleSearch}
          className='bg-red-500 text-white px-4 py-1 rounded-full ml-2'
        >
          Login
        </button>
      </div>
    </nav>
  )
}
