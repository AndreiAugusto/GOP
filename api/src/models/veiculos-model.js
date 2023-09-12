const { Model, DataTypes } = require("sequelize");

class VeiculoModel extends Model {
    static init(database) {
        super.init({
            tipo: DataTypes.TEXT,
            quantidade: DataTypes.INTEGER
        }, {
            tableName: 'veiculos',
            modelName: 'VeiculoModel',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.belongsToMany(models.usuario, { foreignKey: 'id' });
    }
}

module.exports = { VeiculoModel };
