import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://np6igDvNuPJv0oqSTpW-8Q_Rebv3Oyf.supabase.co'
const supabaseAnonKey = 'sb_publishable_eRwxb94QgT3bHDpsefZ6rg_jI1SEXbz'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
