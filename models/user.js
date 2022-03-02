import { Model, DataTypes } from "sequelize";
import Follow from "./follow";

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "writer" });
    db.User.belongsToMany(db.User, {
      through: Follow,
      as: "followers",
      foreignKey: "followingId",
    });
    db.User.belongsToMany(db.User, {
      through: Follow,
      as: "following",
      foreignKey: "followerId",
    });
  }
};