var form = new FormData(); //Create multipart form
      form.append('photo', image); //Put file
​
      form.submit('http://159.203.241.77:8000/photos', function(err, res){
        console.log('err:', err);
        console.log('res:', res);
​
​
      })

      //POST request options, notice 'path' has access_token parameter
      var options = {
          hostname: "159.203.241.77",
          method: 'POST',
          path: '/photos',
          port: 8000,
          headers: form.getHeaders(),
      }

//      Do POST request, callback for response
      var request = http.request(options, function (res){
           console.log(res);
      });

      //Binds form to request
      form.pipe(request);

      //If anything goes wrong (request-wise not FB)
      request.on('error', function (error) {
        console.log(error);
      });
      request.end();
​
​
​
​
      var req = http.request({
        hostname: "159.203.241.77",
        method: 'GET',
        path: '/photos',
        port: 8000
      }, function(res) {
        console.log("Got response: " + res.statusCode);
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });
​
      req.write(image);
      req.end();
​
​
      // var req = http.request({
      //   hostname: "159.203.241.77",
      //   method: 'POST',
      //   path: '/photos',
      //   port: 8000,
      //   form: {
      //     photo:{
      //       value: image,
      //       options: {
      //         filename: 'picture.jpg',
      //         contentType: 'image/jpg'
      //       }
      //     }
      //   },
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }, function(res) {
      //   console.log("Got response: " + res.statusCode);
      // }).on('error', function(e) {
      //   console.log("Got error: " + e.message);
      // });
​
      // // req.write(image);
      // req.end();
​
​
      // var request = new XMLHttpRequest();
      // request.open('POST', 'http://159.203.241.77:8000/photos/last', true);
      // request.setRequestHeader('Content-Type', 'multipart/form-data');
      // request.send(image);
// Add Comment
