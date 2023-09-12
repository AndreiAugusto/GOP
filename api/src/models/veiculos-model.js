const { Model, DataTypes } = require("sequelize");

class VeiculoModel extends Model {
    static init(database) {
        super.init({
            tipo: DataTypes.TEXT,
            quantidade: DataTypes.INTEGER,
            operacaoId: DataTypes.INTEGER
        }, {
            tableName: 'veiculos',
            modelName: 'VeiculoModel',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.belongsTo(models.OperacoesModel, { foreignKey: 'id' });
    }
}

module.exports = { VeiculoModel };
