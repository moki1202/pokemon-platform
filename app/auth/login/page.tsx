'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { compare } from 'bcryptjs'
import { supabaseConfig } from '../supabase/supabase-config'
import { useRouter } from 'next/navigation'
import { updateUsername } from '@/app/store/features/userinfo/usernameslice'
import { updateSignupSuccess } from '@/app/store/features/userinfo/usernameslice'
import { useDispatch } from 'react-redux'

const supabase = supabaseConfig

const Login: React.FC = () => {
  const [emailUsername, setEmailUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      
      const { data, error } = await supabase
        .from('users')
        .select('id, username, email, password')
        .or(`username.eq.${emailUsername},email.eq.${emailUsername}`)
        .single();

      if (error) {  
        console.error("Error checking username/password", error)
        setError('Something went wrong')
        return 
      }
      if (!data) {
        console.log("User not found")
        setError('Invalid credentials')
        return 
      }

      if (await !compare(password, data.password)) {
        setError('Incorrect Credentials')
        return
      }
      
      supabase.auth.signInWithPassword({email: emailUsername, password: password})
      //Handle Logged in succesfully
      dispatch(updateUsername(data.id))
      dispatch(updateSignupSuccess(true))
      router.push('/')
    } catch (error: any) {
      setError(error.message || 'An error occurred');
      }
    
    
  }

  return (
    <>
      <div className='py-[10rem] flex flex-col gap-4 w-1/4 justify-center items-center text-black'>
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
          <input
            type='text'
            placeholder='Email/Username'
            value={emailUsername}
            onChange={(e) => setEmailUsername(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit'>Login</button>
          <span> or </span>
          <Link href='/auth/signup'>
          <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            Signup
          </div>
        </Link>
        </form>
        <div>{error}</div>
      </div>
    </>
  );
};

export default Login
