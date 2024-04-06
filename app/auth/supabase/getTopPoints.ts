import { supabaseConfig } from '@/app/auth/supabase/supabase-config'

export interface LeaderboardEntry {
  username: string
  points: number
}

const supabase = supabaseConfig
export async function getLeaderboard(
  gameType: string
): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, ' + gameType)
      .order(gameType, { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching leaderboard:', error.message)
      return []
    }

    if (!data) {
      console.error('No data found in leaderboard')
      return []
    }

    // Map the data to the leaderboard entry structure
    const leaderboard: LeaderboardEntry[] = data.map((entry: any) => ({
      username: entry.username,
      points: entry[gameType],
    }))

    return leaderboard
  } catch (error) {
    console.error('Error fetching leaderboard:', (error as Error).message)
    return []
  }
}
