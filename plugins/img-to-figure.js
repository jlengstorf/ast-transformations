const visit = require('unist-util-visit');

module.exports = _options => tree => {
  visit(
    tree,
    node => node.tagName === 'img',
    node => {
      console.log({ tree, node });
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
            src,
            alt
          }
        },
        {
          type: 'element',
          tagName: 'figcaption',
          children: [
            {
              type: 'text',
              value: alt
            }
          ]
        }
      ];

      return visit.SKIP;
    }
  );
};
