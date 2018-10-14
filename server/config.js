const rc = require('rc');
const appName = 'baseline-node';

module.exports = rc(appName, {
    server: {
        port: 4000
    },
});