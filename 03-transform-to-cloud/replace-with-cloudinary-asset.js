const visit = require('unist-util-visit');
const upload = require('./upload');
const getImageUrl = require('./build-url');

module.exports = _options => tree => {
  visit(
    tree,
    node => node.tagName === 'img',
    node => {
      const imagePath = node.properties.src;
      const name = 'corgi';

      upload({ imagePath, name });

      node.properties.src = getImageUrl({
        fileName: name,
        uploadFolder: 'ast-transforms',
        transformations: 'q_auto,f_auto'
      });

      node.properties.srcSet = [1800, 1200, 600, 300]
        .map(width => {
          const transformations = `q_auto,f_auto,w_${width}`;
          const url = getImageUrl({
            fileName: name,
            uploadFolder: 'ast-transforms',
            transformations
          });

          return `${url} ${width}w`;
        })
        .join();
    }
  );
};
