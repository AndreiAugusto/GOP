'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('operacao', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            custo: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            nAgentes:{
                type: Sequelize.INTEGER,
                allowNull:false
            },
            qtdVeiculos:{
                type: Sequelize.INTEGER,
                allowNull:false
            },
            cidade:{
                type: Sequelize.TEXT,
                allowNull: false,
            },
            data:{
                type: Sequelize.DATE,
                allowNull: false,
            },
            duracao:{
                type: Sequelize.INTEGER,
                allowNull:false},
            comandante:{
                type: Sequelize.TEXT,
                allowNull: false,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('operacao');
    }
};
