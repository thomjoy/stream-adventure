var through = require('through2');
var write = function(buffer, enc, next) { this.push((buffer.toString('utf-8')).toUpperCase()); next(); }
var stream = through(write);

process.stdin.pipe(stream).pipe(process.stdout);
