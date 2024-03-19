'use client'
import Link from 'next/link'
import SearchBar from './searchbar'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
  const router = useRouter()
  const handleSearch = () => {
    router.push('auth/signup')
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
        <Link href='/how-to-play' className='flex-grow'>
          How to Play
        </Link>
        <Link href='/pokemon-cards' className='flex-grow'>
          PokeDoc
        </Link>
        <Link href='/leaderboard' className='flex-grow'>
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
