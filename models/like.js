'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'postId'});
      Like.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId' });
    }
  }
  Like.init({
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Posts',
        key: 'postId'
      },
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: false
  });
  return Like;
};