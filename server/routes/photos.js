'use strict';
var express = require('express');
var router = express.Router();

var oxford = require('./oxford-api');

var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

var Photo = require('../models/photo');

module.exports = function(io){

  router.post('/', upload.single('photo'), function(req, res, next) {
    var photo = new Photo();


    photo.img = 'data:image/png;base64,'
    photo.img += req.file.buffer.toString('base64');

    io.emit('photo', photo);
    
    photo.data.data = req.file.buffer;

    console.log('req.file:', req.file);

    photo.save(function(err, photo){
      oxford.uploadFile(req.file.buffer, function(err, status, data){
        if(!data){
          return res.send('Face not detected.');
        }

        var faceId = data[0].faceId;

        photo.faceId = faceId;
        photo.save(function(err, savedPhoto){
          Photo.find({}, function(err, photos){

            var ids = photos.map(function(photo){
              return photo.faceId;
            });

            console.log('faceId:', faceId);
            console.log('ids:', ids);

            oxford.identify(faceId, ids, function(err, statusCode, body){
              if(err || statusCode !== 200){
                res.status(400).send({'identify error:': err, body: body});
              } else {
                console.log('body:', body);
                var matchIds = body.map(function(match){
                  return match.faceId;
                });

                Photo.find({'faceId': { $in: matchIds} }, function(err, matches){
                  if(err || !matches) return res.send('No matches');
                  var names = matches.filter(function(match){
                    return match.name;
                  });
                  if(names[0]){
                    var name = names[0].name;
                    matches.forEach(function(match){
                      match.name = name;
                      match.save();
                    });
                    io.emit('name', name);
                    res.send({name: name});
                  } else {
                    res.send({name: '_unknown_'});
                  }
                });
              }
            });
          });
        })
      });
    });
  });

  router.get('/', function(req, res, next) {
    console.log('req.body:', req.body);
    Photo.find({}, function(err, photos) {
      res.status(err ? 400 : 200).send(err || photos);
    });
  });
  router.get('/last', function(req, res, next) {
    Photo.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function(err, photo) {
      res.status(err ? 400 : 200).send(err || photo);
    });
  })
  router.get('/show', function(req, res, next) {
    Photo.find({}, function(err, photos) {
      if(err) res.status(400).send(err);
      res.render('photo', {photos: photos})
    });
  });
  router.post('/identify', function(req, res, next) {
    Photo.findById(req.body._id, function(err, photo) {
      if(err) return res.status(400).send(err);

      photo.name = req.body.name;
      console.log('req.body:', req.body);
      console.log('photo:', photo)
      photo.save(function(err, savedPhoto){
        res.send({_id: req.body._id, name: req.body.name});
      });
    });
  });
  router.get('/nuke', function(req, res){
    res.render('nuke');
  })

  router.get('/show/:id', function(req, res, next) {
    Photo.findById(req.params.id, function(err, photo) {
      if(err) res.status(400).send(err);
      res.render('photo', {photos: [photo]})
    });
  });


  router.get('/:id', function(req, res, next) {
    Photo.findById(req.params.id, function(err, photo) {
      res.status(err ? 400 : 200).send(err || photo);
    });
  });

  router.post('/nuke', function(req, res, next) {
    Photo.remove({}, function(err){
      res.status(err ? 400 : 200).send(err || 'All photos deleted.');
    })
  });

  return router;  
};
