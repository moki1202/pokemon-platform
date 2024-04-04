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
    { label: 'Guess The Pokemon', route: '/how-to-play' },
    { label: 'Pokemon Scribble', route: '/pokemon-scribble' },
  ]
  const handleSearch = () => {
    router.push('/auth/login')
  }
  return (
    <nav>
      <div className='navbar py-4 px-2 flex w-full justify-between items-center text-white fixed bg-opacity-100 z-50 gap-4'>
        <div className='flex ml-4 justify-center items-center'>
          <Link href='/' className='flex-grow ml-4 hover-glow'>
            <img
              src='/assets/logo/pikachu_icon.svg'
              className='px-2 h-[4rem] w-[4rem]'
            />
          </Link>
        </div>
        <div className='flex-grow relative ml-[3rem] mr-[2rem]'>
          <SearchBar />
        </div>
        <div className='relative flex-grow ml-[2rem]'>
          <button onClick={handleGameClick} className='flex-grow'>
            {showDropdown ? <>&#9660;</> : <>&#9650;</>} Games
          </button>
          {showDropdown && (
            <DropdownMenu options={gameOptions} onSelect={handleGameSelect} />
          )}
        </div>
        <div className='flex justify-center items-center ml-[-4rem] z-10'>
          <Link href='/pokemon-cards'>PokeDex </Link>
          <img src='/assets/logo/pokemon-icon.png' className='px-2 ' />
        </div>
        <Link
          href='/pokemon-scribble'
          className='flex-grow mr-[-3rem] ml-[3rem]'
        >
          leaderboard
        </Link>
        <div className='flex mr-4 justify-center items-center'>
          <Link
            href='https://github.com/moki1202/pokemon-app'
            className='flex-grow'
          >
            GitHub
          </Link>
          <img src='/assets/logo/github.svg' className='px-2 ' />
        </div>
        <button
          onClick={handleSearch}
          className='button-color text-white px-4 py-1 rounded-full mr-[2rem]'
        >
          Login
        </button>
      </div>
    </nav>
  )
}
