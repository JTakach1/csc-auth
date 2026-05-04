const hapiAuthJwt2 = require('hapi-auth-jwt2');

const validate = (decoded, request, h) => {
  return {
    isValid: true,
    credentials: {
      ...decoded,
      scope: decoded.roles
    }
  };
};

const registerAuth = async (server) => {
  await server.register(hapiAuthJwt2);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,

    verifyOptions: {
      algorithms: ['HS256']   
    },

    urlKey: false,            
    cookieKey: false,         

    validate
  });
};

module.exports = registerAuth;