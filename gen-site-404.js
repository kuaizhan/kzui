const fs = require('fs');

fs.writeFileSync('./docs-dist/404.html', fs.readFileSync(`./docs-dist/index.html`, 'utf8'))