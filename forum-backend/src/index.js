const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const threadRoutes = require('./routes/threadRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', threadRoutes);
app.use('/api', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});