import { createClient } from '@supabase/supabase-js'

// Check if the environment variables are defined
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Supabase URL or API key is missing in environment variables')
}

// Create Supabase client using environment variables
export const supabaseConfig = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)
