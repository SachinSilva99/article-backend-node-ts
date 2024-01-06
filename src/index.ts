import dotenv from 'dotenv';

dotenv.config();
import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import mongoose, {Schema} from "mongoose";

import * as process from "process";
import userRoutes from "./routes/user.routes";
import articleRoutes from "./routes/article.routes";
import cors from 'cors';

mongoose.connect(process.env.MONGO_URL as string)
  .then(r => console.log("connected to mongdb"))
  .catch(er => console.log(er));


const app: Express = express();
// @ts-ignore
app.use(bodyParser.json());

app.use(cors({
  origin: "*"
}));

app.listen(8000, () => {
  console.log("server started on port 8000");
});

app.use('/user', userRoutes);
app.use('/article', articleRoutes);
/**
 * create article
 */



