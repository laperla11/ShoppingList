const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = Item = mongoose.model('item', ItemSchema);
// 'item' --> becomes 'items' as name of collection on MongoDB
