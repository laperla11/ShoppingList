const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Item Model
const User = require('../models/User.model'); // Item --> becomes items as name of collection on MongoDB

const authenticateUser = async (req, res, next) => {
  const { password, email } = req.body;

  // Simple validation
  if (!password || !email) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exists' });
    }

    // if user exists
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    jwt.sign({ id: user.id }, process.env.jwtSecret, (err, token) => {
      if (err) {
        throw err;
      }
      res.status(201).json({
        token: token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    });
  } catch (err) {
    console.log('addUser-err', err.errors);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    res.status(404).json({ success: false });
  }
};

module.exports = { authenticateUser, getUser };
