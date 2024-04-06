'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateUsername } from '@/app/store/features/userinfo/usernameslice'
import { useDispatch } from 'react-redux'
import bcrypt from 'bcryptjs'
import { updateSignupSuccess } from '@/app/store/features/userinfo/usernameslice'
import { supabaseConfig } from '../supabase/supabase-config'

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
      <div className='py-[10rem] flex flex-col gap-4 w-1/4 justify-center items-center text-black'>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        {error && <p>{error}</p>}
      </div>
    </>
  )
}

export default SignUp
