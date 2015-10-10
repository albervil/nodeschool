var combine = require('stream-combiner');
var split = require('split')
var zlib = require('zlib')
var through = require('through')
var lodash = require('lodash')

module.exports = function(){
	var result = {};

	function add_book(parsed_line){	
		result['books'].push(parsed_line['name']);
	}

	return combine(
		//read newline-separated json
		split(),
		//group books into genres
		through(function(line){
			if (line.length > 0){
				this.push(JSON.parse(line));
			}
		}),
		through(function(parsed_line){
			if (parsed_line['type'] === 'genre'){
				if (!lodash.isEmpty(result)){
					this.push(JSON.stringify(result));
					this.push("\n");
					result = {};
				}
				result['name'] = parsed_line['name'];
				result['books'] = [];
			} else {
				add_book(parsed_line);
			}
		}, function end(){
			this.push(JSON.stringify(result));
			this.push("\n");
			this.push(null);
		}),
		//then gzip the output
		zlib.createGzip()
	);
}

/*
// Here's the reference solution:

var combine = require('stream-combiner');
var through = require('through2');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
  var grouper = through(write, end);
  var current;

  function write (line, _, next) {
    if (line.length === 0) return next();
    var row = JSON.parse(line);

    if (row.type === 'genre') {
      if (current) {
        this.push(JSON.stringify(current) + '\n');
      }
        current = { name: row.name, books: [] };
    }
    else if (row.type === 'book') {
      current.books.push(row.name);
    }
    next();
  }
  
  function end (next) {
    if (current) {
      this.push(JSON.stringify(current) + '\n');
    }
    next();
  }

  return combine(split(), grouper, zlib.createGzip());
};
*/
