const supabase = require('../config/db'); // Import Supabase client
const bcrypt = require('bcryptjs'); // Untuk membandingkan password
const jwt = require('jsonwebtoken'); // Untuk membuat JWT

// Fungsi untuk registrasi pengguna
const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan data pengguna ke Supabase
    const { data, error } = await supabase
      .from('users') // Tabel users
      .insert([{ email, password: hashedPassword, username }]) // Data yang akan disimpan
      .select(); // Mengembalikan data yang baru saja diinsert

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Kirim respons sukses
    res.status(201).json({ message: 'User registered successfully', data });
  } catch (error) {
    // Kirim respons error
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fungsi untuk login pengguna
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Bandingkan password yang diinput dengan password di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Buat JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Kirim token sebagai respons
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export fungsi register dan login
module.exports = { register, login };