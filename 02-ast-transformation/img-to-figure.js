const visit = require('unist-util-visit');

module.exports = _options => tree => {
  visit(
    tree,
    node =>
      node.tagName === 'p' && node.children.some(n => n.tagName === 'img'),
    (node, index, parent) => {
      console.log({ children: node.children });
      // Find the image tag
      const imageNode = node.children.find(n => n.tagName === 'img');
      const captionNode = node.children.find(n => n.type === 'text');
      const caption = captionNode.value.trim();

      const src = imageNode.properties.src;
      const alt = imageNode.properties.alt;

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
              value: caption
            }
          ]
        }
      ];

      return visit.SKIP;
    }
  );
};
