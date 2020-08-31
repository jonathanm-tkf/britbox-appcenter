// index.js
const genre = require('./genre.json');
const search = require('./search.json');
const quickSearch = require('./quick-search.json');

module.exports = () => ({
  genre,
  search,
  'quick-search': quickSearch
});
