const fs = require('fs');
const unified = require('unified');
const visit = require('unist-util-visit');
const markdown = require('remark-parse');
// const html = require('remark-html');

const remark2rehype = require('remark-rehype');
const raw = require('rehype-raw');
const html = require('rehype-stringify');

const transformer = ast => {
  visit(
    ast,
    node => node.tagName === 'img' && !node.properties.dataJasonTouchedThis,
    node => {
      console.log(JSON.stringify(node, null, 2));

      const src = node.properties.src;
      const alt = node.properties.alt;

      delete node.properties;

      node.type = 'element';
      node.tagName = 'figure';
      node.children = [
        {
          type: 'element',
          tagName: 'img',
          properties: {
            src: 'https://example.org',
            alt: 'test',
            title: 'test title',
            dataJasonTouchedThis: 'true'
          }
        },
        {
          type: 'element',
          tagName: 'figcaption',
          children: [
            {
              type: 'text',
              value: 'Look at this puppy!'
            }
          ]
        }
      ];
    }
  );
};

const contents = unified()
  .use(markdown)
  .use(remark2rehype, { allowDangerousHTML: true })
  .use(raw)
  .use(() => transformer)
  .use(html)
  .processSync(fs.readFileSync('example.md'))
  .toString();

console.log(contents);
