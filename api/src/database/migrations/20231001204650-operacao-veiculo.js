'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('operacao_veiculo', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        quantidade: {
         type: Sequelize.INTEGER,
         defaultValue: 0,
         allowNull: false,
        },
        operacaoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model:'operacao', key:'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        veiculoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model:'veiculos', key:'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('operacao_veiculo');
  }
};
