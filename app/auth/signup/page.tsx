'use client'
import React, { useState } from 'react'

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle signup logic here
  }

  return (
    <>
      <div>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit'>Signup</button>
        </form>
      </div>
    </>
  )
}

export default Signup
