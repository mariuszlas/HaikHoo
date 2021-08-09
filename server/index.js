const app = require('./server.js');
const port = process.env.PORT || 3000;
const host = 'localhost';

app.listen(port, () => console.log(`Express server is listening on http://${host}:${port}`))
