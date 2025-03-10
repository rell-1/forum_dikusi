const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); 

const supabaseUrl = process.env.SUPABASE_URL; // Mengambil SUPABASE_URL dari .env
const supabaseKey = process.env.SUPABASE_KEY; // Mengambil SUPABASE_KEY dari .env

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key are required in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase client initialized successfully'); // Log untuk memastikan koneksi berhasil
module.exports = supabase;