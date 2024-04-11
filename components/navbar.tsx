'use client'
import Link from 'next/link'
import SearchBar from './searchbar'
import { useRouter } from 'next/navigation'
import { Option } from './dropdown'
import { useState } from 'react'
import DropdownMenu from './dropdown'
import { selectUsername } from '@/app/store/features/userinfo/usernameslice'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignupSuccess } from '@/app/store/features/userinfo/usernameslice'
import ProfileModal, { ProfileOption } from './common-modal'
import { useEffect } from 'react'
import { useRef } from 'react'
import {
  updateUsername,
  updateSignupSuccess,
} from '@/app/store/features/userinfo/usernameslice'

export const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const username: string | null = useSelector(selectUsername)
  const isSignupSuccess: boolean = useSelector(selectSignupSuccess)

  useEffect(() => {
    setIsLoggedIn(isSignupSuccess)
  }, [isSignupSuccess])
  console.log(isSignupSuccess, 'value of isSignupSuccess')

  const handleGameClick = () => {
    setShowDropdown(!showDropdown)
  }

  const handleGameSelect = (route: string) => {
    router.push(route)
    setShowDropdown(false)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false) // Close dropdown if clicked outside of it
    }
  }

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false) // Close modal if clicked outside of it
    }
  }

  useEffect(() => {
    // Attach click event listener to the document to handle clicks outside of the dropdown
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('click', handleClickOutsideModal)

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('click', handleClickOutsideModal)
    }
  }, [])

  const gameOptions: Option[] = [
    { label: 'Guess The Pokemon', route: '/guess-that-pokemon' },
    { label: 'Pokemon Scribble', route: '/pokemon-scribble' },
  ]
  const handleSearch = () => {
    if (isSignupSuccess) {
      setShowModal(!showModal)
    } else {
      router.push('/auth/signup')
    }
  }
  console.log(username, 'username is this')

  const handleLogout = () => {
    dispatch(updateUsername(''))
    dispatch(updateSignupSuccess(false))
    setShowModal(false)
  }

  const profileOptions: ProfileOption[] = [
    { label: 'Logout', onClick: () => handleLogout() },
    { label: 'Edit Profile', onClick: () => console.log('edit profile') },
    { label: 'Dark Mode', onClick: () => console.log('dark mode') },
    {
      label: 'Switch Account',
      onClick: () => {
        router.push('/auth/signup')
        setShowModal(false)
      },
    },
  ]

  return (
    <nav>
      <div className='navbar py-4 flex w-full justify-between items-center text-white fixed bg-opacity-100 z-50 gap-4'>
        <div className='flex justify-center items-center flex-grow'>
          <Link href='/' className='hover-glow'>
            <img
              src='/assets/logo/pikachu_icon.svg'
              className='px-2 h-[4rem] w-[4rem]'
            />
          </Link>
        </div>
        <div className='flex-grow'>
          <SearchBar />
        </div>
        <div className='flex-grow ml-[2rem] relative' ref={dropdownRef}>
          <button onClick={handleGameClick} className='flex-grow'>
            {showDropdown ? <>&#9660;</> : <>&#9650;</>} Games
          </button>
          <div className=''>
            {showDropdown && (
              <DropdownMenu options={gameOptions} onSelect={handleGameSelect} />
            )}
          </div>
        </div>
        <div className='flex justify-center items-center ml-[-4rem] z-10'>
          <Link href='/pokemon-cards'>PokeDex </Link>
          <img src='/assets/logo/pokemon-icon.png' className='px-2 ' />
        </div>
        <Link href='/leaderboard' className='flex-grow ml-[3rem]'>
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
        <div ref={modalRef} className='flex items-center mr-[2rem]'>
          {isLoggedIn ? (
            <div
              className='flex cursor-pointer items-center'
              onClick={handleSearch}
            >
              <img
                src='/assets/images/pikachu_wallpaper.jpg'
                alt='Profile'
                className='w-10 h-10 rounded-full mr-2 cursor-pointer'
              />
              <span className='cursor-pointer'>{username}</span>
            </div>
          ) : (
            <Link href='/auth/signup'>
              <button className='button-color text-white px-4 py-1 rounded-full mr-[2rem]'>
                Login
              </button>
            </Link>
          )}
          {showModal && (
            <div>
              <ProfileModal options={profileOptions} isOpen={showModal} />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
