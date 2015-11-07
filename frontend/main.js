'use strict';

$(document).ready(init);

function init(){
  // $('.save').click(saveImage);
  // $('.delete').click(deleteImage);
}

var socket = io.connect('http://knockknockwhosthere.herokuapp.com');
socket.on('photo', function (data) {
  console.log(data);
  $('.image').attr('src', data.img);
  socket.emit('my other event', { my: 'data' });
});

// function saveImage(){

// }

// function delete(){

// }

