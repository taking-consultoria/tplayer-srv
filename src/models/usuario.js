'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Estudo, Favorito}) {
      Usuario.Favoritos = Usuario.belongsToMany(Estudo, {through: Favorito, foreignKey: 'id_usuario', targetKey: 'id_estudo', as: 'estudos'})
      Estudo.Favoritos = Estudo.belongsToMany(Usuario, {through: Favorito, foreignKey: 'id_estudo', targetKey: 'id_usuario', as: 'favoritos'})
    }
  };
  Usuario.init({
    id_usuario: {
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    senha: DataTypes.STRING,
    nascimento: DataTypes.DATE,
    sexo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    schema: 'player'
  });
  return Usuario;
};