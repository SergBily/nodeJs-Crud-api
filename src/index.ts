import { createServer } from 'http';
import 'dotenv/config';
import { router } from './router/router.js';

const port = process.env.PORT;
const server = createServer(router);

server.listen(port, () => {
  console.log(`Server work on ${port} port`);
});
