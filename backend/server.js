const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/profile', require('./routes/profile'));
app.use('/api/emergency', require('./routes/emergency'));

app.get('/', (req, res) => {
  res.json({ message: '🏥 MedQR Backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});