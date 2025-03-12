const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); 

const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key are required in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase client initialized successfully'); 
module.exports = supabase;