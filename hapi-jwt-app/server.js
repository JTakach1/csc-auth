require('dotenv').config();

const Hapi = require('@hapi/hapi');
const registerAuth = require('./plugins/auth');
const menuRoutes = require('./routes/menu');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  await registerAuth(server);

  server.route(menuRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();