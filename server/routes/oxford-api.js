'use strict';

var request = require('request');
var fs = require('fs');

module.exports.uploadImage = function(filename, cb) {
  var options = {
    method: 'POST',
    url: 'https://api.projectoxford.ai/face/v0/detections?analyzesAge=true&analyzesGender=true&analyzesHeadPose=true',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': 'a7283cfa95c94dc28a8d302fcc8e8297'
    },
    body: fs.createReadStream(filename)
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      var result = JSON.parse(body);
      console.log(result);
      cb(null, 200, result.faceId);
    }
    else {
      cb(err, response.statusCode);
    }
  });
}

module.exports.identify = function(faceId, faceIds) {
  var options = {
    method: 'POST',
    url: 'https://api.projectoxford.ai/face/v0/findsimilars',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'a7283cfa95c94dc28a8d302fcc8e8297'
    },
    body: {
      faceId: faceId,
      faceIds: faceIds
    }
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      var result = JSON.parse(body);
      console.log(result);
      // result sample:
      // [
      //   {
      //     "faceId": "4edd8ff8-4372-4edf-ae31-c73b59da6e1e"
      //   }
      // ]
      cb(null, 200, result);
    }
    else {
      cb(err, response.statusCode);
    }
  }));
}
