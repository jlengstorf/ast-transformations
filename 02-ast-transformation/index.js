const fs = require('fs');
const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

const imgToFigure = require('./img-to-figure');

const contents = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(imgToFigure)
  .use(html)
  .processSync(fs.readFileSync('corgi.md'))
  .toString();

console.log(contents);
