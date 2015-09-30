var through = require('through2');
var split = require('split');

var i = 0;

process.stdin
	.pipe(split())
	.pipe(through(function (line, _, next){
		i++;
		if (i % 2 === 0){
			this.push('\n');
			this.push(line.toString().toUpperCase());
		} else {
			this.push('\n');
			this.push(line.toString().toLowerCase());
		}
		next();
	}))
	.pipe(process.stdout);


/* OFFICIAL SOLUTION
var through = require('through2');
var split = require('split');

var lineCount = 0;
var tr = through(function (buf, _, next) {
    var line = buf.toString();
    this.push(lineCount % 2 === 0
        ? line.toLowerCase() + '\n'
        : line.toUpperCase() + '\n'
    );
    lineCount ++;
    next();
});
process.stdin
    .pipe(split())
    .pipe(tr)
    .pipe(process.stdout)
;
*/
