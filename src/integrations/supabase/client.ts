
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = "https://ioqtgdaaiusyfzkvkpxm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvcXRnZGFhaXVzeWZmenZrcHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODEwMjEsImV4cCI6MjA2NTI1NzAyMX0.E00PD5mK7mUqQJWbDBeaBz2HaR8hEVKcFCBiqn0_Zzw"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
