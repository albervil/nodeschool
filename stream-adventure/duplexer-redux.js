'use strict'

var duplex = require('duplexer2')
var through = require('through2')

module.exports = function (counter) {
  var counts = {}
  return duplex(through.obj(write, end), counter)

  function write(row, _, next){
		var country = row.country;
		counts[country] = (counts[country] || 0);
		counts[country]++;
		next();
	}

	function end(){
		counter.setCounts(counts);
	}
}

/*
  var duplexer = require('duplexer2');
  var through = require('through2').obj;

  module.exports = function (counter) {
      var counts = {};
      var input = through(write, end);
      return duplexer(input, counter);

      function write (row, _, next) {
          counts[row.country] = (counts[row.country] || 0) + 1;
          next();
      }
      function end (done) {
          counter.setCounts(counts);
          done();
      }
  };
*/
