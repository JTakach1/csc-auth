const menuRoutes = [
  {
    method: 'GET',
    path: '/menu',
    options: {
      auth: {
        strategy: 'jwt',
        mode: 'optional'
      }
    },
    handler: (request, h) => {
      const user = request.auth.credentials;
      return {
        menu: ['Pizza', 'Burger', 'Salad'],
        message: user
          ? `Welcome back, ${user.name}! Your roles: ${user.roles}`
          : 'Browsing as guest'
      };
    }
  },

  {
    method: 'POST',
    path: '/menu',
    options: {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    },
    handler: (request, h) => {
      const { credentials } = request.auth;
      const { item } = request.payload;
      return h.response({
        message: `'${item}' added to the menu`,
        addedBy: credentials.name
      }).code(201);
    }
  },

  {
    method: 'PUT',
    path: '/menu/{item}',
    options: {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    },
    handler: (request, h) => {
      const { credentials } = request.auth;
      return {
        message: `'${request.params.item}' updated`,
        updatedBy: credentials.name
      };
    }
  },

  {
    method: 'DELETE',
    path: '/menu/{item}',
    options: {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    },
    handler: (request, h) => {
      const { credentials } = request.auth;
      return {
        message: `'${request.params.item}' removed from the menu`,
        deletedBy: credentials.name
      };
    }
  }
];

module.exports = menuRoutes;