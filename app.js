// Passenger-compatible Next.js entry
// This exports a request handler rather than listening on a port.

const next = require('next');

const app = next({ dev: false }); // production mode
const handle = app.getRequestHandler();

module.exports = app.prepare().then(() => {
    return (req, res) => handle(req, res);
});
