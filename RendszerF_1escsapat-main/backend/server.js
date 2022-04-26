import app from './server/app.js';

const port = process.env.PORT || 5000;
const server = app();

server.listen(port, () => console.log(`Server started on port ${port}`));