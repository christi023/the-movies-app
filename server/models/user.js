const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// this function will be called before a document is saved
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    // hash passwords
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  const oneHour = moment().add(1, 'hour').valueOf();
  user.tokenExp = oneHour;
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function (token, email, password) {
  // Search for a user by email and password.

  const user = await User.findOne({ email, 'token ': token });
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  return user;
};

/*userSchema.statics.findByCredentials = function (token, cb) {
  const user = this;

  jwt.verify(token, 'secret', function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};*/

const User = mongoose.model('User', userSchema);

module.exports = { User };
