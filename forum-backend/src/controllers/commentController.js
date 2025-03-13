const supabase = require('../config/db');

const createComment = async (req, res) => {
  const { content, threadId } = req.body;
  const userId = req.user?.id;

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
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCommentsByThreadId = async (req, res) => {
  const { threadId } = req.params;

  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        users:user_id (username)
      `)
      .eq('thread_id', threadId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { createComment, getCommentsByThreadId};
