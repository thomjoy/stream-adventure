var combine = require('stream-combiner'),
    split = require('split'),
    through = require('through2'),
    zlib = require('zlib');

module.exports = function () {

    var group = through(groupByGenre, end),
        store;

    function groupByGenre(line, _, next) {
      if (line.length === 0) return next();

      var line = JSON.parse(line.toString());

      if (line.type === 'genre') {
        if (store) {
          this.push(JSON.stringify(store) + '\n');
        }

        store = {name: line.name, books: []}
      }
      if (line.type === 'book') {
        store.books.push(line.name);
      }

      next();
    }
    function end(next) {
      if (store) {
        this.push(JSON.stringify(store) + '\n');
      }
      next();
    }

    return combine(split(),group,zlib.createGzip())
}