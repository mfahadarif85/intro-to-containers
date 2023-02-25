// more-or-less the example code from the hapi-pino repo
const hapi = require("@hapi/hapi");

async function start() {
  const server = hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  });

  server.route({
    method: "GET",
    path: "/",
    handler() {
      return { success: true };
    },
  });

  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  await server.start();

  return server;
}

start().catch((err) => {
  console.log(err);
  process.exit(1);
});

// "use strict";

// const Hapi = require("@hapi/hapi");

// async function start() {
//   // Create a server with a host and port
//   const server = Hapi.server({
//     host: "0.0.0.0",
//     port: process.env.PORT || 3000,
//     debug: false, // disable Hapi debug console logging
//   });

//   // Add the route
//   server.route({
//     method: "GET",
//     path: "/",
//     // handler() {
//     //   return { succes: true };
//     // },
//     handler: async function (request, h) {
//       // request.log is HAPI standard way of logging
//       request.log(["a", "b"], "Request into hello world");

//       // you can also use a pino instance, which will be faster
//       request.logger.info("In handler %s", request.path);

//       return "hello world";
//     },
//   });

//   await server.register({
//     plugin: require("hapi-pino"),
//     options: {
//       // Redact Authorization headers, see https://getpino.io/#/docs/redaction
//       redact: ["req.headers.authorization"],
//     },
//   });

//   // also as a decorated API
//   server.logger.info("another way for accessing it");

//   // and through Hapi standard logging system
//   server.log(["subsystem"], "third way for accessing it");

//   await server.start();

//   return server;
// }

// start().catch((err) => {
//   console.log(err);
//   process.exit(1);
// });
