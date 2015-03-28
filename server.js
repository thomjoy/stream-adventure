var through = require('through2'),
    http = require('http');

var server = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    console.log('POST');
    req.pipe(through(function(data, _, next) {
      console.log(data);
      var line = data.toString().toUpperCase();
      this.push(line);
      next();
    })).pipe(res);
  }
  else {
    res.end('Send me a POST');
  }
});

server.listen(parseInt(process.argv[2]));