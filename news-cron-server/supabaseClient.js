const {createClient} = require("@supabase/supabase-js")
require('dotenv').config(); 

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

console.log(process.env.SUPABASE_URL)
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)
module.exports = supabase