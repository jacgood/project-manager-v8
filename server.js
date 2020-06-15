const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(cors());

// Passport config
app.use(passport.initialize());
require('./config/passport')(passport);

// Define Routes
app.use('/api/users', users);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/src/', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
