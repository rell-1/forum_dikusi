const supabase = require('../config/db');

// Fungsi untuk membuat komentar baru
const createComment = async (req, res) => {
  const { content, threadId } = req.body;
  const userId = req.user?.id; // Ambil userId dari middleware auth (pastikan user sudah login)

  // Jika user tidak terautentikasi, kirim respons error
  if (!userId) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ content, thread_id: threadId, user_id: userId }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Comment created successfully', data });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fungsi untuk mendapatkan komentar berdasarkan thread ID
const getCommentsByThreadId = async (req, res) => {
  const { threadId } = req.params;

  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('thread_id', threadId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createComment, getCommentsByThreadId };
