var http = require('http');

var collectedData = "";

http.get(process.argv[2], function(response){
	response.setEncoding('utf8');
	response.on('data', function(data){
		collectedData += data;
	});
	response.on('error', console.error);
	response.on('end', function(){
		console.log(collectedData.length);
		console.log(collectedData);
	});
});

/*

OFFICIAL SOLUTION - WITH EXT LIBRARIES

var http = require('http')
var bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err)
      return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})
