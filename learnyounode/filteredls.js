var fs = require('fs');
var path = require('path');

function filteredLs(dir, extension){
	fs.readdir(dir, function(err, list){
		for(i=0; i<list.length; i++){
			if (path.extname(list[i]) === "."+extension){
				console.log(list[i]);
			}
		}
	});
}

filteredLs(process.argv[2], process.argv[3]);
