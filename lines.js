var through = require('through2'),
    split = require('split'),
    lineCount = 0,
    tr = through(function(buf, _, next) {
      var line = buf.toString();
      this.push(lineCount % 2 === 0
          ? line.toUpperCase() + '\n'
          : line.toLowerCase() + '\n'
      );
      lineCount ++;
      next();
    });

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout)