const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

router.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//------------------REGISTER USER ROUTE----------------------
router.post('/api/users/register', async (req, res) => {
  // Create a new user-register new user
  try {
    const user = new User(req.body);
    await user.save();
    //token
    const token = await user.generateAuthToken();
    return res.status(201).send({ user }).json({
      success: true,
    });
  } catch (error) {
    return error;
  }
});

// -------------------- LOGIN USER ROUTE ---------------------
router.post('/api/users/login', async (req, res) => {
  // Login a registered user
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // validate
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }

    const token = await user.generateAuthToken();
    res.cookie('w_authExp', user.tokenExp);
    res.cookie('w_auth', token);
    return res.status(200).json({
      token,
      loginSuccess: true,
      userId: user._id,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

//-------------------- LOGOUT USER ROUTE ---------------------
router.get('/api/users/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user._id = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { token: '', tokenExp: '' },
      () => {
        return res.status(200).send({ logoutSuccess: true });
      },
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

//------------------------ DELETE USER --------------------------
router.delete('/api/users/delete', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
