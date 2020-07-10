import { createServer } from './createServer';

const PORT = process.env.PORT || 5000;

createServer()
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
