const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// load env var
require('dotenv').config();

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
// express body parser adding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/the-movies-app', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// enable cors
app.use(cors());

// ------- ROUTER -------- //
app.use('/api/users', require('./routes/user'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/favorite', require('./routes/favorite'));

//app.use('/api/users', require('./routes/user'));

// Currently serving static assets
app.use(express.static(path.join(__dirname, 'public')));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
//app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use('/the-movies-app/', express.static('client/build'));

  // index.html for all page routes    html or routing and navigation
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
