'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId' });
      Post.hasMany(models.Comment, { foreignKey: 'postId', sourceKey: 'postId' });
      Post.hasMany(models.Like, { foreignKey: 'postId', sourceKey: 'postId' });
    }
  }
  Post.init({
    postId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts',
    timestamps: true,
  });
  return Post;
};