const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../models/Items.model'); // Item --> becomes items as name of collection on MongoDB

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({ createdBy: req.params.userId }).sort({
      date: -1,
    });
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};

const addItem = async (req, res, next) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      createdBy: req.body.createdBy,
    });

    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    console.log('addItem-err', err.errors);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    await item.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    // console.log(err);
    res.status(404).json({ success: false });
  }
};

module.exports = { getItems, addItem, deleteItem };
