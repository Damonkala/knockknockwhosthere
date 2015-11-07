'use strict';

var express = require('express');
var router = express.Router();

var Photo = require('../models/photo');

router.post('/', function(req, res, next) {
  var photo = new Photo(req.body);
  photo.save(function(err, savedPhoto){
    res.status(err ? 400 : 200).send(err || 'Image saved.');
  });
});

router.get('/', function(req, res, next) {
  console.log('req.body:', req.body);
  Photo.find({}, function(err, photos) {
    res.status(err ? 400 : 200).send(err || photos);
  });
});

module.exports = router;
