'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Acls', [
      {
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        title: 'other_user',
        access: [1, 4, 6, 7],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        uuid: '123e4567-e89b-12d3-a456-426614174001',
        title: 'User',
        access: [2, 4, 5, 7],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        uuid: '123e4567-e89b-12d3-a456-426614174002',
        title: 'Admin',
        access: [3, 5, 6, 7],
        created_at: new Date(),
        updated_at: new Date()
      }
    ])

  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Acls', [
      { uuid: '123e4567-e89b-12d3-a456-426614174000' },
      { uuid: '123e4567-e89b-12d3-a456-426614174001' },
      { uuid: '123e4567-e89b-12d3-a456-426614174002' }
    ], {});
  }
};
