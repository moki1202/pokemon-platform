'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    //username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const username = formData.get('username') as string

  // Check if username is unique, if not do not proceed further and throw error
  const isUsernameUnique = await getUsername(username);
  if (!isUsernameUnique) {
    throw new Error('Username is already taken. Please choose a different one.');
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

   // Store user data in Supabase
   await storeUserData(username, data.email);

  revalidatePath('/', 'layout')
  redirect('/auth/notification')
}

const getUsername = async (username: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('usernamelist')
    .select('id')
    .eq('username', username);

    if (error) {
      console.error('Error checking username uniqueness:', error.message);
      return false;
    }
  
    return data.length === 0; // no data returned i.e unique
}

async function storeUserData(username: string, email: string) {
  const supabase = createClient();

  try {
    // Insert the new user into the 'users' table
    const { data, error } = await supabase
      .from('usernamelist')
      .insert([{ username, email }]);
    
    if (error) {
      throw new Error(`Error inserting user data: ${error.message}`);
    }

    return data; // Return the inserted data if successful
  } catch (error: any) {
    console.error('Error storing user data:', error.message);
    throw new Error('Failed to store user data. Please try again.');
  }
}