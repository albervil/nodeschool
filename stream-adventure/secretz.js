var zlib = require('zlib');
var tar = require('tar');
var crypto = require('crypto');
var fs = require('fs');
var through = require('through');
var combine = require('stream-combiner');

//Decrypt
var crypto_stream = crypto.createDecipher(process.argv[2], process.argv[3]);

//Gunzipping
var gunzip_stream = zlib.createGunzip();

//Decompressing tar and writing contents
var tar_parser = tar.Parse();
tar_parser.on('entry', function(e){
	if (e.type === 'File'){
		var filename = e.path;

		var hashing_stream = crypto.createHash('md5', { encoding: 'hex' });
		e.pipe(hashing_stream).pipe(through(function(hash){
			this.push(hash + ' ' + filename + '\n');
		})).pipe(process.stdout);
	}
});

return combine(process.stdin, crypto_stream, gunzip_stream, tar_parser);

// Here's the reference solution:

// var crypto = require('crypto');
// var tar = require('tar');
// var zlib = require('zlib');
// var concat = require('concat-stream');

// var parser = tar.Parse();
// parser.on('entry', function (e) {
//     if (e.type !== 'File') return;

//     var h = crypto.createHash('md5', { encoding: 'hex' });
//     e.pipe(h).pipe(concat(function (hash) {
//         console.log(hash + ' ' + e.path);
//     }));
// });

// var cipher = process.argv[2];
// var pw = process.argv[3];
// process.stdin
//   .pipe(crypto.createDecipher(cipher, pw))
//   .pipe(zlib.createGunzip())
//   .pipe(parser);
