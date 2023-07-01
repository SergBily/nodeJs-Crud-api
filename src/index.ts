import dotenv from 'dotenv';
import { createServer } from 'http';
import { router } from './router/router';

dotenv.config();
const port = process.env.PORT;
const server = createServer(router);

server.listen(port, () => {
  console.log(`Server work on ${port} port`);
});
