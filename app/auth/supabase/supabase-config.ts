import { createClient } from '@supabase/supabase-js'

export const supabaseConfig = createClient(
  `https://ehbbdhnoflxpuhvgbptn.supabase.co`,
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYmJkaG5vZmx4cHVodmdicHRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjMwNTk1NywiZXhwIjoyMDI3ODgxOTU3fQ.trYtGnExZUQnICBzQdxzo2bqdlHwzl37GhgJEqNXWDs`
)
