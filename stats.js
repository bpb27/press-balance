const sources = require('./sources.json');
const news = require('./sample.json');
const common = require('./common.json');
const single = {};
const double = {};
const triple = {};
const quadruple = {};
const quintuple = {};

function setOrIncrement(target, key) {
  if (target[key]) target[key]++;
  else target[key] = 1;
}

function assign (phrase, collection, sourceId, tags) {
  if (collection[phrase]) {
    collection[phrase].num++;
    setOrIncrement(collection[phrase].sources, sourceId);
    tags.forEach(tag => setOrIncrement(collection[phrase].tags, tag));
  }
  else {
    collection[phrase] = {num: 1, sources: {}, tags: {}}
    collection[phrase].sources[sourceId] = 1;
    tags.forEach(tag => collection[phrase].tags[tag] = 1);
  }
}

news.articles.forEach(item => {
  let sourceId = item.source.id;
  let sourceName = item.source.name;
  let source = sources.find(source => source.id === sourceId);

  if (!source) return;

  let tags = source.tags;
  let words = item.title.split(' ').map(word => word.toLowerCase().replace(/[^a-zA-Z]+/g, ''));

  words.forEach((word, i) => {
    let phrase = '';

    if (word && !common.includes(word)) {
      assign(word, single, sourceId, tags);
    }

    if (words[i + 1]) {
      phrase = words.slice(i, i + 2).join(' ');
      assign(phrase, double, sourceId, tags);
    }

    if (words[i + 1] && words[i + 2]) {
      phrase = words.slice(i, i + 3).join(' ');
      assign(phrase, triple, sourceId, tags);
    }

    if (words[i + 1] && words[i + 2] && words[i + 3]) {
      phrase = words.slice(i, i + 4).join(' ');
      assign(phrase, quadruple, sourceId, tags);
    }

    if (words[i + 1] && words[i + 2] && words[i + 3] && words[i + 4]) {
      phrase = words.slice(i, i + 5).join(' ');
      assign(phrase, quintuple, sourceId, tags);
    }

  });

});

function removeSingles (collection) {
  const newCollection = {};
  Object.keys(collection).forEach(phrase => {
    if (collection[phrase].num > 1) newCollection[phrase] = collection[phrase];
  });
  return newCollection;
}

const all = {
  single: removeSingles(single),
  double: removeSingles(double),
  triple: removeSingles(triple),
  quadruple: removeSingles(quadruple),
  quintuple: removeSingles(quintuple)
}

var fs = require('fs');
fs.writeFile('current-stats.json', JSON.stringify(all), 'utf8');
