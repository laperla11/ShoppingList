const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Item Model
const User = require('../models/User.model'); // Item --> becomes items as name of collection on MongoDB

const registerUser = async (req, res, next) => {
  const { name, password, email } = req.body;

  // Simple validation
  if (!name || !password || !email) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      password,
      email,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash; // hashed password

        // Create the newuser on DB
        const user = await newUser.save();
        // Create jwt token unique to user
        const jwtSecret = process.env.jwtSecret;
        jwt.sign(
          { id: user.id },
          jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.status(201).json({
              token: token,
              user: { id: user.id, name: user.name, email: user.email },
            });
          }
        );
      });
    });
  } catch (err) {
    console.log('addUser-err', err.errors);
  }
};

module.exports = { registerUser };
