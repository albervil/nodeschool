var trumpet = require('trumpet');
var through = require('through2');

var tr = trumpet();
var thr = through(function(buf, _, next){
	this.push(buf.toString().toUpperCase());
	next();
});

var loud = tr.select('.loud').createStream();

loud.pipe(thr).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);

/*
OFFICIAL SOLUTION
var trumpet = require('trumpet');
  var through = require('through2');
  var tr = trumpet();

  var loud = tr.select('.loud').createStream();
  loud.pipe(through(function (buf, _, next) {
      this.push(buf.toString().toUpperCase());
      next();
  })).pipe(loud);

  process.stdin.pipe(tr).pipe(process.stdout);
/*
