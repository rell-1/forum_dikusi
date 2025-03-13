const supabase = require('../config/db');

// Fungsi untuk membuat thread baru
const createThread = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; 

  try {
    const { data, error } = await supabase
      .from('threads')
      .insert([{ title, content, user_id: userId }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Thread created successfully', data });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getThreads = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('threads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getThreadById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: thread, error: threadError } = await supabase
      .from('threads')
      .select('*')
      .eq('id', id)
      .single();

    if (threadError) {
      return res.status(400).json({ error: threadError.message });
    }

    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('thread_id', id);

    if (commentsError) {
      return res.status(400).json({ error: commentsError.message });
    }

    res.json({ ...thread, comments });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteThread = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Asumsikan Anda memiliki informasi user yang terautentikasi

  try {
    // Pertama, cek apakah thread tersebut ada dan dimiliki oleh user yang terautentikasi
    const { data: thread, error: threadError } = await supabase
      .from('threads')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (threadError) {
      return res.status(400).json({ error: threadError.message });
    }

    if (!thread) {
      return res.status(404).json({ error: 'Thread not found or you do not have permission to delete it' });
    }

    // Hapus thread
    const { error: deleteError } = await supabase
      .from('threads')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return res.status(400).json({ error: deleteError.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { createThread, getThreads, getThreadById, deleteThread };