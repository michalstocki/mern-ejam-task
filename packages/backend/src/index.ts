import { config } from './config';
import { createServer } from './createServer';

createServer(config)
  .then((server) => {
    server.listen(config.port, () => {
      console.log(`Listening on ${config.port}`);
    });
  })
  .catch((error) => {
    console.error(`Server error ${error}`);
    process.exit(1);
  });
