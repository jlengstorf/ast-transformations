const fs = require('fs');
const unified = require('unified');
const visit = require('unist-util-visit');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const raw = require('rehype-raw');
const html = require('rehype-stringify');

const imgToFigure = require('./plugins/img-to-figure');

const contents = unified()
  .use(markdown)
  .use(remark2rehype, { allowDangerousHTML: true })
  .use(raw)
  .use(imgToFigure)
  .use(html)
  .processSync(fs.readFileSync('example.md'))
  .toString();

console.log(contents);
