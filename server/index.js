const config = require('./config.js');
const server = require('./server.js');

try {
    server()
    .listen(config.server.port, () => {
        console.log('server listening on ' + config.server.port);
    });
} catch (e) {
    console.log('server error ' + e);
}