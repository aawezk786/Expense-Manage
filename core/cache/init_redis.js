const { redisPort, redisHost } = require("../config");
var redis = require("redis");
const client = redis.createClient({
  port: redisPort,
  host: redisHost,
});

// const client = redis.createClient(process.env.REDISTOGO_URL, {
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

client.on("connect", () => {
  console.log("Connected To Redis");
});

client.on("ready", () => {
  console.log("Redis Ready");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Disconnected From Redis");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
