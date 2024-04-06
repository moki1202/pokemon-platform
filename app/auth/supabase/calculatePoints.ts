import { supabaseConfig } from '@/app/auth/supabase/supabase-config'

const supabase = supabaseConfig

interface UpdateGameRequest {
  username: string | null
  points: number
  gameType: string
}

export async function updateGamePoints({
  username,
  points,
  gameType,
}: UpdateGameRequest): Promise<boolean> {
  try {
    // Fetch current game points for the user
    const { data, error } = await supabase
      .from('users')
      .select(gameType)
      .eq('username', username)
      .single()

    if (error) {
      console.error('Error fetching user data:', error.message)
      return false
    }

    if (!data) {
      console.error('User not found')
      return false
    }

    const currentPoints = (data as any)[gameType] || 0
    const newTotalPoints = currentPoints + points

    // Update game points in the database
    const { error: updateError } = await supabase
      .from('users')
      .update({ [gameType]: newTotalPoints })
      .eq('username', username)

    if (updateError) {
      console.error('Error updating game points:', updateError.message)
      return false
    }

    console.log('Game points updated successfully')
    return true
  } catch (error) {
    console.error('Error updating game points:', (error as Error).message)
    return false
  }
}
