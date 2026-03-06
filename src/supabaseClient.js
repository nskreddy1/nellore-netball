import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zyvwjydlgxuuioikvjlz.supabase.co'
const supabaseAnonKey = 'sb_publishable_eRwxb94QgT3bHDpsefZ6rg_jI1SEXbz'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
