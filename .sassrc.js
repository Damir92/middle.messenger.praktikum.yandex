const path = require('path');
const cwd = process.cwd();

module.exports = {
    data: '@import "./src/utils/variables.scss";',
    includePaths: [
        path.resolve(cwd, 'node_modules')
    ]
};
