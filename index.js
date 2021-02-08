const server = require('./api/server');
const PORT = 5000;

// START YOUR SERVER HERE
server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });