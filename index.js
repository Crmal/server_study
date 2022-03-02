import express from "express";
import morgan from "morgan";

import db from "./models";
import apiRouter from "./api";
const app = express();
const port = 3000;
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});