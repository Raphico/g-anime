const express = require('express');
require('dotenv').config();
const connectDb = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const protect = require('./middleware/authMiddleware');
const cors = require('cors');
const path = require('path');

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/watchList', require('./routes/api/watchListRouter'));
app.use('/api/user', require('./routes/api/usersRouter'));

if (process.env.NODE_ENV === 'production')
{
  app.use(express.static(path.join(__dirname, '../', 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
  })
}
else
{
  app.get('/', (req, res) => {
    res.send('Not in production');
  })
}

app.use(errorHandler);
app.use(protect);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));
