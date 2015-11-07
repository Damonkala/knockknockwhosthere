'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let photoSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  data: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Photo', photoSchema);