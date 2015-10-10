var crypto = require('crypto');
var stream = crypto.createDecipher('aes256', process.argv[2]);

process.stdin.pipe(stream).pipe(process.stdout);

// Here's the reference solution:

// var crypto = require('crypto');
// process.stdin
//     .pipe(crypto.createDecipher('aes256', process.argv[2]))
//     .pipe(process.stdout)
// ;
