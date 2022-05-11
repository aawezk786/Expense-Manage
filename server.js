const http = require("http");
const { PORT } = require("./core/config");
const app = require("./app");
const port = PORT || 7000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server is Listening at " + port);
});
