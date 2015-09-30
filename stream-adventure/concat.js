var concat = require('concat-stream');

var rev = concat(function (body){
	console.log(body.toString().split('').reverse().join(''));
});

process.stdin.pipe(rev);

/*
OFFICIAL SOLUTION

var concat = require('concat-stream');

process.stdin.pipe(concat(function (src) {
	var s = src.toString().split('').reverse().join('');
  console.log(s);
}));
*/
