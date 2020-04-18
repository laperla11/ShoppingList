const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const {
  getItems,
  clearItems,
  addItem,
  deleteItem,
  updateItem,
} = require('../../controllers/items.controller');

// @route  PUT api/items/clear
// @desc   Clear All Items
// @access Private
router.put('/clear', auth, clearItems);

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

// @route  UPDATE/PUT api/items/:id
// @desc   Update An Item
// @access Private
router.put('/:id', auth, updateItem);

module.exports = router;
