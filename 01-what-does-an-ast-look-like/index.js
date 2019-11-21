const fs = require('fs');
const unified = require('unified');
const markdown = require('remark-parse');
const html = require('remark-html');

const contents = unified()
  .use(markdown)
  .use(() => tree => console.log(JSON.stringify(tree, null, 2)))
  .use(html)
  .processSync(fs.readFileSync('home.md'))
  .toString();

console.log(contents);
