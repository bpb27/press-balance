const news = require('./sample.json');

const text = news.articles.map(article => article.title);

console.log(text.join())
