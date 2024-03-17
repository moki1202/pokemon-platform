import Link from 'next/link'
import SearchBar from './searchbar'

export const Navbar = () => {
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
      </div>
    </nav>
  )
}
