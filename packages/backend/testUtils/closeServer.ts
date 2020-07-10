import { Server } from 'http';

export function closeServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}
