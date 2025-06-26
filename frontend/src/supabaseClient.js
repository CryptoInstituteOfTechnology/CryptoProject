import {createClient} from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

//creates login / signup

export const supabase = createClient(supabaseUrl,supabaseKey)