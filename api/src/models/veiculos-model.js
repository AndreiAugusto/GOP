const { Model, DataTypes } = require("sequelize");

class VeiculoModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            tipoVeiculo: DataTypes.TEXT
        }, {
            tableName: 'veiculos',
            modelName: 'Veiculos',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.hasMany(models.OperacaoVeiculo, { foreignKey: 'veiculoId' });
    }
}

module.exports = { VeiculoModel };
