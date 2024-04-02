'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import storeInFirestore from '../firestore/storeData';
import { checkUsernameExists } from '../firestore/getData';

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC<SignUpProps> = ({email, username, password}) => {
  const [error, setError] = useState<string | null>(null);
  
  const auth = getAuth();
  
  const handleSignUp = async () => {
    try {
      // Check if the username is already taken
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
      setError("Username is already taken. Please choose a different one.");
      return;
    }
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
      // TODO: Handle successful sign-up
      // Store user in firestore
      await storeInFirestore(user, username, email);
      const router = useRouter()
      router.push('/'); //redirect to homepage
    } catch (error: any) {
      setError(error.message); // Cast 'error' to 'any' to handle unknown type
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;