const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const {
  authenticateUser,
  getUser,
} = require('../../controllers/auth.controller');

// @route  POST api/auth
// @desc   Auth user
// @access Public

router.route('/').post(authenticateUser);

// @route  GET api/auth/user
// @desc   GET user data
// @access Private

router.get('/user', auth, getUser);

module.exports = router;
