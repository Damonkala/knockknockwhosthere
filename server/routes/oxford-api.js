'use strict';

var request = require('request');

var oxfordApiKey = 'a7283cfa95c94dc28a8d302fcc8e8297';

module.exports.postUrl = function(url, cb) {
  var options = {
    method: 'POST',
    url: 'https://api.projectoxford.ai/face/v0/detections?analyzesAge=true&analyzesGender=true&analyzesHeadPose=true',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': oxfordApiKey
    },
    json: {url: url}
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      cb(null, 200, body);
    }
    else {
      cb(err, response.statusCode);
    }
  });
}

module.exports.uploadFile = function(data, cb) {
  var options = {
    method: 'POST',
    url: 'https://api.projectoxford.ai/face/v0/detections',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': oxfordApiKey
    },
    body: data
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      cb(null, 200, JSON.parse(body));
    }
    else {
      cb(err, response.statusCode);
    }
  });
}

module.exports.identify = function(faceId, faceIds, cb) {
  var options = {
    method: 'POST',
    url: 'https://api.projectoxford.ai/face/v0/findsimilars',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': oxfordApiKey
    },
    json: {
      faceId: faceId,
      faceIds: faceIds
    }
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      // result sample:
      // [
      //   {
      //     "faceId": "4edd8ff8-4372-4edf-ae31-c73b59da6e1e"
      //   }
      // ]
      cb(null, 200, body);
    }
    else {
      cb(err, response.statusCode);
    }
  });
}
