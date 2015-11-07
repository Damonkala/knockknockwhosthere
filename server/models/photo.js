'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  img: { type: String }
});

module.exports = mongoose.model('Photo', photoSchema);
