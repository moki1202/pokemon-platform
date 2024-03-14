import React from 'react'
import Link from 'next/link'
import SearchBar from './searchbar'

export const Navbar = () => {
  return (
    <nav>
      <div className='bg-gray-800 py-4 px-4 flex flex-between w-full justify-between items-center text-white fixed'>
        <Link href='/' className='flex-grow ml-[150px]'>
          Home
        </Link>
        <div className='flex-grow mr-20'>
          <SearchBar />
        </div>
        <Link href='/how-to-play' className='flex-grow'>
          How to Play
        </Link>
        <Link href='/leaderboard' className='flex-grow'>
          leaderboard
        </Link>
        <Link href='/link-to-github' className='flex-grow'>
          GitHub
        </Link>
      </div>
    </nav>
  )
}
