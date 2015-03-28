var tar = require('tar'),
    zlib = require('zlib'),
    through = require('through2'),
    concat = require('concat-stream'),
    crypto = require('crypto'),
    cipher = process.argv[2],
    passphrase = process.argv[3],
    decipher = crypto.createDecipher(cipher, passphrase),
    filename;

// for each file in the tar input, print a hex-encoded md5 hash of the
// file contents followed by a single space followed by the filename, then a newline.
var parser = tar.Parse();
parser.on('entry', function (e) {
  if (e.type !== 'File') return;

  var h = crypto.createHash('md5', { encoding: 'hex' });
  e.pipe(h).pipe(concat(function(hash) {
    process.stdout.write(hash + ' ' + e.path + '\n');
  }));
});

process.stdin
  .pipe(decipher)
  .pipe(zlib.createGunzip())
  .pipe(parser)