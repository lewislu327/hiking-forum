'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Mountain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mountain.belongsTo(models.Altitude)
      Mountain.hasMany(models.Comment)
      Mountain.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'MountainId',
        as: 'FavoritedUsers',
      })
    }
  }
  Mountain.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      height: DataTypes.STRING,
      difficulty: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Mountain',
    }
  )
  return Mountain
}
