'use client';
import React, { useState } from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../config';

interface SignInProps {
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Specify the type of error state

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth,email, password); // Use auth from Firebase instance
      // Handle successful sign-in
      onClose(); // Close the sign-in form
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='bg-white p-4 border border-gray-300'>
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
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default SignIn;
