const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.TEXT,
            email: DataTypes.TEXT,
            senha: DataTypes.TEXT
        }, {
            tableName: 'usuario',
            modelName: 'UsuarioModel',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.hasMany(models.veiculos, { foreignKey: "id"});
    }
}

module.exports = { UsuarioModel };
