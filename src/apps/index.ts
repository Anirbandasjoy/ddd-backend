import http from 'http';
import app from './app';
const PORT = process.env.PORT || 4522;
const server = http.createServer(app);
import { MongoDBConnection } from '@/packages/database';


const main = async () => {
  try {
    await MongoDBConnection();
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

main();
