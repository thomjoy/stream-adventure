var spawn = require('child_process').spawn,
    duplex = require('duplexer2');

module.exports = function(cmd, args) {
  var proc = spawn(cmd, args);
  return duplex(proc.stdin, proc.stdout);
};