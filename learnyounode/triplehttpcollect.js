var http = require('http');

var collectedData = "";

function collectData(url, callback){
	http.get(url, function(response){
		response.setEncoding('utf8');
		response.on('data', function(data){
			collectedData += data;
		});
		response.on('error', console.error);
		response.on('end', callback);
	});
}

collectData(process.argv[2], function(){
	console.log(collectedData);
	collectedData = "";
	collectData(process.argv[3], function(){
		console.log(collectedData);
		collectedData = "";
		collectData(process.argv[4], function(){
			console.log(collectedData);
		});
	});
});

/*
OFFICAL SOLUTION

var http = require('http')
    var bl = require('bl')
    var results = []
    var count = 0

    function printResults () {
      for (var i = 0; i < 3; i++)
        console.log(results[i])
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err)
            return console.error(err)

          results[index] = data.toString()
          count++

          if (count == 3)
            printResults()
        }))
      })
    }

    for (var i = 0; i < 3; i++)
      httpGet(i)
*/
