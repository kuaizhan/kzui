module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.endsWith('.less')) {
          path.remove();
        }
      }
    }
  };
};