const fs = require('fs');
const unified = require('unified');
const rehype = require('rehype-parse');
const useCloudinary = require('./replace-with-cloudinary-asset.js');
const toHTML = require('rehype-stringify');

const contents = unified()
  .use(rehype)
  .use(useCloudinary)
  .use(toHTML)
  .processSync(fs.readFileSync('index.html'))
  .toString();

fs.writeFileSync('./output.html', contents);
