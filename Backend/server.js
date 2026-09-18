const express = require('express');
const cors = require('cors');
require('dotenv').config();

const queryRoutes = require('./routes/queryRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', queryRoutes);

app.get('/', (req, res) => {
    res.send('Food Supply AI Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});