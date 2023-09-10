'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
         },
         nome: {
             type: Sequelize.TEXT,
             allowNull: false
         },
         email: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
         },
         senha: {
            type: Sequelize.TEXT,
            allowNull: false
         }
        });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  }
};
