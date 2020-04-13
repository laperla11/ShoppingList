const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
// const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');

const items = require('./routes/api/items');

dotenv.config({ path: './config/config.env' });

const app = express();

// BodyParser Middleware
app.use(express.json());

// Connect to Mongo
connectDB();

// Use Routes
app.use('/api/items', items);

// Serve static assets(client files) if in production
if (process.env.NODE_ENV === 'prodcution') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));
  // app.use(express.static('client/build'));
  //all reqests other than api should be responded with index.html in static folder(client/build)
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname + 'client/build/index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
