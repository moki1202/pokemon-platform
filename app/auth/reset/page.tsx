'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { supabaseConfig } from '../supabase/supabase-config'
import Link from 'next/link'

const supabase = supabaseConfig

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('')

  const handlePasswordChange = async () => {
    try {
        if (password !== confirmPassword) {
            setError("Passwords don't match"); 
            return;
        }  

        await supabase.auth.updateUser({ password: confirmPassword })
      // Why are storing password in db when supabase is handling all the authentication  
      //   // Update user data into database
      //   const hashedPassword = await bcrypt.hash(confirmPassword, 10)
      // const { error } = await supabase
      // .from('users') 
      // .update({ password: hashedPassword })
      // .eq('id', id);

    if (error) {
      console.error('Error updating password.')
      setError('Error updating password.')
      return
    }

      const router = useRouter()
      router.push('/')

    } catch (error) {
      console.error('Error resetting password:', (error as Error).message)
      setError('An error occurred while resetting password.')
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
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
          />
          <input
            type='password'
            placeholder='Retype Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
          />
          <button
            onClick={handlePasswordChange}
            className='w-full px-4 py-2 button-color text-white rounded-xl focus:outline-none py-2'
          >
            Reset
          </button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  )
}

export default PasswordReset
