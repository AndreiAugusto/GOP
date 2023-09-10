const { Model, DataTypes } = require("sequelize");

class OperacoesModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            custo: DataTypes.FLOAT,
            nAgentes: DataTypes.INTEGER,
            qtdVeiculos: DataTypes.INTEGER,
            cidade: DataTypes.TEXT,
            data: DataTypes.DATE,
            duracao: DataTypes.INTEGER,
            comandante: DataTypes.TEXT,
        }, {
            tableName: 'operacao',
            modelName: 'OperacoesModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { OperacoesModel };
