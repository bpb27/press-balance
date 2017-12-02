var sources = require('./sources.json');
var apiKey = require('./api-key.json').key;

// 20 source limit per request (38 currently)
// https://newsapi.org/sources

function createUrl (sources) {
  var str = sources.reduce(function(str, item){ str += item.id + ','; return str;}, '');
  return 'https://newsapi.org/v2/top-headlines?sources=' + str.substr(0, str.length - 1) + '&apiKey=' + apiKey;
}

var urls = [
  createUrl(sources.slice(0,19)),
  createUrl(sources.slice(20, 39))
];

console.log(urls);
