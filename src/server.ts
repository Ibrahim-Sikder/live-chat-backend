import mongoose from 'mongoose';
import config from './app/config';
import { httpServer } from './socket/server';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    httpServer.listen(config.port, () => {
      console.log(`Techzon server running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection detected, shutting down...', err);
  if (httpServer) {
    httpServer.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception detected, shutting down...', err);
  process.exit(1);
});
