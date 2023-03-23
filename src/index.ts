require("dotenv").config();
import express, { Application } from "express";
import config from "config";
import log from "./utils/logger";
import deserializeUser from "./middleware/auth.middleware";
import connectDb from "./utils/connectDb";
import authRoute from "./modules/auth/auth.route";
import userRoute from "./modules/user";
import categoryRoute from "./modules/category/category.route";
import userRequire from "./middleware/userRequire";
import recordRoute from "./modules/record/record.route";
import { StatusCodes } from "http-status-codes";
const app: Application = express();

app.use(express.json());
app.get("/healthcheck", (_, res) => {
  res.status(StatusCodes.OK).send("healthcheck");
});
app.use(deserializeUser);

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", userRequire, categoryRoute);
app.use("/api", userRequire, recordRoute);

const port: number = config.get<number>("port");

app.listen(port, () => {
  connectDb();
  log.info(`App started at http://localhost:${port}`);
});
