const { Model, DataTypes } = require("sequelize");

class OperacoesModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: DataTypes.TEXT,
            custo: DataTypes.FLOAT,
            nAgentes: DataTypes.INTEGER,
            cidade: DataTypes.TEXT,
            data: DataTypes.DATE,
            duracao: DataTypes.INTEGER,
            comandante: DataTypes.TEXT,
        }, {
            tableName: 'operacao',
            modelName: 'Operacoes',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.hasMany(models.OperacaoVeiculo, { foreignKey: 'operacaoId' });
    }
}

module.exports = { OperacoesModel };
