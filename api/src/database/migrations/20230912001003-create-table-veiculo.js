'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('veiculos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
     },
     tipoVeiculo: {
        type: Sequelize.TEXT,
        allowNull: false,
     }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('veiculos');
  }
};
