const { version } = require('./package.json');
const path = require('path');

module.exports = {
  title: 'Language as Graph',
  version,
  components: 'src/components/**/*.js',
  getExampleFilename(componentPath) {
    const baseName = path.basename(componentPath, path.extname(componentPath));
    return path.join(
      componentPath,
      '..',
      '..',
      'markdown',
      baseName + '.md'
    );
  },
};
