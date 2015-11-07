'use strict'

function init() {
  var imgUrl1 = 'http://i.imgur.com/aMrEkCv.png';
  // var imgUrl2 = 'http://i.imgur.com/srfUOe4.jpg';
  var key = 'a7283cfa95c94dc28a8d302fcc8e8297';

  var params = {
    // Request parameters
    "analyzesFaceLandmarks": "false",
    "analyzesAge": "false",
    "analyzesGender": "false",
    "analyzesHeadPose": "false",
  };
  
  $.ajax({
    url: 'https://api.projectoxford.ai/face/v0/detections?' + $.param(params)
,
    beforeSend: function(xhrObj){
      // Request headers
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a7283cfa95c94dc28a8d302fcc8e8297");
    },
    type: "POST",
    // Request body
    data: `{ 'url': '${imgUrl1}' }`,
  })
  .done(function(data) {  
    console.log(JSON.stringify(data));
  })
  .fail(function(err) {
    console.log('error',err)
    alert("error");
  });

}


$(document).ready(init)

// https://api.projectoxford.ai/face/v0/detections&analyzesFaceLandmarks=false&analyzesAge=false&analyzesGender=false&analyzesHeadPose=false





