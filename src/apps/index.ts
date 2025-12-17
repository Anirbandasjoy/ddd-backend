import http from 'http';
import app from './app';
const PORT = process.env.PORT || 4522;
const server = http.createServer(app);

const main = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

main();
