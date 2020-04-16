const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const {
  getItems,
  addItem,
  deleteItem,
} = require('../../controllers/items.controller');

// @route  POST api/items
// @desc   Create A Post
// @access Private
// router.route('/').post(addItem);
router.post('/', auth, addItem);

// @route  POST api/items/:userId
// @desc   Get All Items filtered by UserId
// @access Public
router.route('/:userId').get(getItems);

// @route  DELETE api/items/:id
// @desc   Delete An Item
// @access Private
router.delete('/:id', auth, deleteItem);

module.exports = router;
