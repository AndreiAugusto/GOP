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
     tipo: {
        type: Sequelize.TEXT,
        allowNull: false,
     },
     quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
     },
     operacaoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model:'operacao', key:'id'},
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
     }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('veiculos');
  }
};
