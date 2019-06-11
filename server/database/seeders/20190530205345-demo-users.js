/* eslint-disable */
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Jamie',
      lastName: 'Foxx',
      email: 'jamiefoxx@gmail.com',
      password: bcrypt.hashSync('jamiefoxx', 10),
      avatarUrl: '',
      verified: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Eden',
      lastName: 'Hazard',
      email: 'eden@gmail.com',
      password: bcrypt.hashSync('edenHazard', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Kylian',
      lastName: 'Mbappe',
      email: 'kylian@gmail.com',
      password: bcrypt.hashSync('kylianMbappe', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Hello',
      lastName: 'Books',
      email: 'hellobooks@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Rich',
      lastName: 'Richard',
      email: 'notsuperadmin@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'User',
      lastName: 'Deactivate',
      email: 'deactivateuser@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'User',
      lastName: 'Activate',
      email: 'Activateuser@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'UseIna',
      lastName: 'inactivate',
      email: 'inactiveuser@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
