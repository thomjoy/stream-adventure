var duplex = require('duplexer2'),
    through = require('through2').obj;

module.exports = function(counter) {
  var input = through(write, end),
      counts = {};
  return duplex(input, counter);

  function write(row, _, next) {
    counts[row.country] = (counts[row.country] || 0) + 1;
    next();
  };
  function end(done) { counter.setCounts(counts); done(); }


};