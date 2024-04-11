'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateUsername } from '@/app/store/features/userinfo/usernameslice'
import { useDispatch } from 'react-redux'
import bcrypt from 'bcryptjs'
import { updateSignupSuccess } from '@/app/store/features/userinfo/usernameslice'
import { supabaseConfig } from '../supabase/supabase-config'
import Link from 'next/link'

const supabase = supabaseConfig

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const router = useRouter()
  const dispatch = useDispatch()

  const handleSignUp = async () => {
    try {
      // Check if username is already taken
      const { data: usernameData, error: usernameError } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)

      if (usernameError) {
        console.error(
          'Error checking existing username:',
          usernameError.message
        )
        setError('An error occurred while signing up.')
        return
      }

      if (usernameData && usernameData.length > 0) {
        setError('Username already exists.')
        return
      }

      // Check if email is already registered
      const { data: emailData, error: emailError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)

      if (emailError) {
        console.error('Error checking existing email:', emailError.message)
        setError('An error occurred while signing up.')
        return
      }

      if (emailData && emailData.length > 0) {
        setError('Email already exists.')
        return
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      // Sign up user
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password: hashedPassword,
      })

      if (signUpError) {
        console.error('Error signing up:', signUpError.message)
        setError('An error occurred while signing up.')
        return
      }

      // Insert user data into database
      const { error: insertError, data: insertedUserData } = await supabase
        .from('users')
        .insert([
          {
            username,
            email,
            password: hashedPassword,
            guesspokemon: 0,
            pokemonscribble: 0,
          },
        ])

      if (insertError) {
        console.error('Error inserting user data:', insertError.message)
        setError('An error occurred while signing up.')
        return
      }
      dispatch(updateUsername(username))
      dispatch(updateSignupSuccess(true))
      router.push('/auth/redirect-email')
    } catch (error) {
      console.error('Error signing up:', (error as Error).message)
      setError('An error occurred while signing up.')
    }
  }

  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center text-black '>
        <div className='flex flex-col flex-between bg-gray-100 rounded-3xl shadow-2xl w-1/4 p-10 gap-6'>
          <div className='flex justify-center items-center'>
            <Link href='/' className='flex-grow hover-glow'>
              <img
                src='/assets/logo/pikachu_icon.svg'
                className='px-2 h-[4rem] w-[4rem]'
              />
            </Link>
          </div>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
          />
          <button
            onClick={handleSignUp}
            className='w-full px-4 py-2 button-color text-white rounded-xl focus:outline-none py-2'
          >
            Sign Up
          </button>
          {error && <p>{error}</p>}
          <p className='text-center text-blue-500'>
            Already a user? <Link href='/auth/login'>Log in</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp
