'use strict';

var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

var Photo = require('../models/photo');

router.post('/', upload.single('photo'), function(req, res, next) {
  var photo = new Photo();

  photo.img = 'data:image/png;base64,'
  photo.img += req.file.buffer.toString('base64');

  console.log('photo:', photo);
  photo.save(function(err, savedPhoto){
    res.status(err ? 400 : 200).send(err || 'Image saved:');
  });
});

router.get('/', function(req, res, next) {
  console.log('req.body:', req.body);
  Photo.find({}, function(err, photos) {
    res.status(err ? 400 : 200).send(err || photos);
  });
});

router.get('/show', function(req, res, next) {
  Photo.find({}, function(err, photos) {
    res.render('photo', {photos: photos})
  });
});

router.get('/show/:id', function(req, res, next) {
  Photo.findById(req.params.id, function(err, photo) {
    res.render('photo', {photos: [photo]})
  });
});

router.get('/:id', function(req, res, next) {
  Photo.findById(req.params.id, function(err, photo) {
    res.status(err ? 400 : 200).send(err || photo);
  });
});


module.exports = router;
