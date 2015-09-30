var fs = require('fs');
var path = require('path');

module.exports = function(dir, extension, callback){
	fs.readdir(dir, function(err, data){
		if(err)
			return callback(err);
		var filteredList = [];
		for(i=0;i<data.length;i++){
			if(path.extname(data[i]) === "."+extension){
				filteredList.push(data[i]);
			}
		}
		callback(null, filteredList);
	});
}

/*

OFFICIAL SOLUTION

var fs = require('fs')
var path = require('path')

module.exports = function (dir, filterStr, callback) {

	fs.readdir(dir, function (err, list) {
  	if (err)
    	return callback(err)

    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
	})
}
*/
