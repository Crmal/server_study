import { Sequelize } from "sequelize";
import User from "./user";
import Post from "./post";
import Follow from "./follow";

const env = process.env.NODE_ENV || "development";
import { development as config } from "../config/config";
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Follow = Follow;

User.init(sequelize);
Post.init(sequelize);
Follow.init(sequelize);

User.associate(db);
Post.associate(db);

export default db;