import dotenv from 'dotenv';
import { createServer } from 'http';
import { router } from './router/router';

dotenv.config();
const DEFAULT_PORT = 4000;
const port = process.env.PORT || DEFAULT_PORT;
const server = createServer(router);

server.listen(port, () => {
  console.log(`Server work on ${port} port`);
});
