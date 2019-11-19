const visit = require('unist-util-visit');

module.exports = _options => tree => {
  visit(
    tree,
    node => node.tagName === 'img',
    node => {
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
            title: 'test title'
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

      return visit.SKIP;
    }
  );
};
