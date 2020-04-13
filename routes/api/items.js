const express = require('express');
const router = express.Router();

const {
  getItems,
  addItem,
  deleteItem,
} = require('../../controllers/items.controller');

// @route  GET api/items
// @desc   Get All Items
// Qaccess Public
router.route('/').get(getItems).post(addItem);

// @route  POST api/items
// @desc   Create A Post
// Qaccess Public
// router.route('/').post(addItem);

// @route  DELETE api/items/:id
// @desc   Delete An Item
// Qaccess Public
router.route('/:id').delete(deleteItem);

module.exports = router;
