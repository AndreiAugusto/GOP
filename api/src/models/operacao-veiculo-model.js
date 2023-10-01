const { Model, DataTypes} = require("sequelize");

class OperacaoVeiculoModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            quantidade: DataTypes.INTEGER,
            operacaoId: DataTypes.INTEGER,
            veiculoId: DataTypes.INTEGER
        }, {
            tableName: 'operacao_veiculo',
            modelName: 'OperacaoVeiculo',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models){
        this.belongsTo(models.Operacoes, {foreignKey:'operacaoId'}),
        this.belongsTo(models.Veiculos, {foreignKey:'veiculoId'})
    }
}

module.exports = { OperacaoVeiculoModel };
