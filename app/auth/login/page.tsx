'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseConfig } from '../supabase/supabase-config'
import bcrypt from 'bcryptjs'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import {
  updateUsername,
  updateSignupSuccess,
} from '@/app/store/features/userinfo/usernameslice'

const supabase = supabaseConfig

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const router = useRouter()
  const handleLogin = async () => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      // Check if email exists
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username, email, password')
        .eq('email', email)
        .single()

      if (userError) {
        console.error('Error fetching user data:', userError.message)
        setError('An error occurred while logging in.')
        return
      }
      console.log(userData, 'this is the userData')
      if (!userData) {
        setError('Invalid email.')
        return
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, userData.password)
      console.log(isValidPassword, 'are passwords same')

      if (!isValidPassword) {
        setError('Invalid password.')
        return
      }

      dispatch(updateUsername(userData.username))
      dispatch(updateSignupSuccess(true))
      // Redirect user to dashboard or home page upon successful login
      router.push('/')

      
    } catch (error) {
      console.error('Error logging in:', (error as Error).message)
      setError('An error occurred while logging in.')
    }
  }

  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center text-black'>
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
          <p className='text-center text-blue-500'>
            Forgot your Password? <Link href='/auth/forgot-password'><p>Reset</p></Link>
          </p>
          <button
            onClick={handleLogin}
            className='w-full px-4 py-2 button-color text-white rounded-xl focus:outline-none py-2'
          >
            Log In
          </button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  )
}

export default Login
