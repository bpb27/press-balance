const sources = require('./sources.json');
const news = require('./sample.json');
const common = require('./common.json');
const hash = {};

news.articles.forEach(item => {
  let words = item.title.split(' ');
  let sourceId = item.source.id;
  let sourceName = item.source.name;
  let source = sources.filter(source => source.id === sourceId)[0];

  if (!source) return;
  
  let tags = source.tags;

  words.forEach(word => {
    let sanitized = word.toLowerCase().replace(/[^a-zA-Z]+/g," ").replace(/\s/g,'');
    if (sanitized && sanitized.length && !common.includes(sanitized)) {
      if (hash[sanitized]) {

        hash[sanitized].num++;

        if (hash[sanitized].sources[sourceId]) hash[sanitized].sources[sourceId]++;
        else hash[sanitized].sources[sourceId] = 1;

        tags.forEach(tag => {
          if (hash[sanitized].tags[tag]) hash[sanitized].tags[tag]++;
          else hash[sanitized].tags[tag] = 1;
        });

      }
      else {
        hash[sanitized] = {num: 1, sources: {}, tags: {}};
        hash[sanitized].sources[sourceId] = 1;
        tags.forEach(tag => hash[sanitized].tags[tag] = 1);
      }
    }
  });

});

console.log(hash);

var fs = require('fs');
fs.writeFile('current-stats.json', JSON.stringify(hash), 'utf8');
