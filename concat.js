var concat = require('concat-stream');
var reverse = function(data){
  process.stdout.write(data.toString().split("").reverse().join(""));
};

process.stdin.on('error', function(err) { console.error(err); process.exit(1); });

process.stdin
  .pipe(concat(reverse));