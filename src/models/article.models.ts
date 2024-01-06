import {model, Schema, Types} from "mongoose";
import { ObjectId } from 'mongodb';
import {IArctile} from "../types/SchemaTypes";


const articlesSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  publishedDate: {type: Date, required: true, default: Date.now()},
  user: {type: Schema.Types.ObjectId, required: true, ref: "user"}
});
const articleModel = model<IArctile>("article", articlesSchema);
export default articleModel;