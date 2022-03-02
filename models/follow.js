import { DataTypes, Model } from "sequelize";
import User from "./user";

class Follow extends Model {
  static init(sequelize) {
    return super.init(
      {
        followingId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        followerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "Follow",
        timestamps: false,
      },
    );
  }
}

export default Follow;