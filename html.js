var trumpet = require('trumpet');
var through = require('through2');
var tr = trumpet();

var htmlStream = tr.select('.loud').createStream();

// pipe the input to the output to create a loop
// otherwise we lose the rest of the content after we have transformed
// stdin -> tr -> htmlStream -> tr -> stdout
htmlStream.pipe(through(function(buffer, _, next) {
  this.push(buffer.toString().toUpperCase());
  next();
})).pipe(htmlStream);


process.stdin.pipe(tr).pipe(process.stdout);