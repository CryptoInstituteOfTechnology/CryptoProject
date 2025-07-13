const {createClient} = require("@supabase/supabase-js")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)


module.exports = supabase