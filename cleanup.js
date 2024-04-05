const { client } = require('./auth');

async function cleanup() {
  try {
    await client.close();
    console.log('Connection to MongoDB closed successfully.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
}

cleanup();
