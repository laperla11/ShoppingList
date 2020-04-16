const express = require('express');
const router = express.Router();

const { registerUser } = require('../../controllers/Users.controller');

// @route  POST api/users
// @desc   Register new user
// @access Public

router.route('/').post(registerUser);

module.exports = router;
