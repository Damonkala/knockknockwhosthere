'use strict';

$(document).ready(init);

function init(){
  $('.identify').click(saveName);
  $('.forget').click(forgetName);
}

var socket = io.connect('http://knockknockwhosthere.herokuapp.com');
socket.on('photo', function (data) {
  console.log(data);
  $('.image').attr('src', data.img);
  socket.emit('my other event', { my: 'data' });
});

function saveName(){
  var receivedName = $('.faceId').val();
  console.log(receivedName);
  //SAVE IMAGE WITH NAME AS ATTR
  //...
  $('.faceId').val('');
}

function forgetName(){
  //DELETE IMG FROM DATABASE
  $('.faceId').val('')
}

