'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  data: { data: Buffer, contentType: String },
  img: { type: String }
});

module.exports = mongoose.model('Photo', photoSchema);
