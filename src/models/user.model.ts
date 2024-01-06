import mongoose from "mongoose";
import {IUser} from "../types/SchemaTypes";



const userSchema = new mongoose.Schema<IUser>({
  username: {type: String, required: true, unique: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
});

const userModel = mongoose.model<IUser>("user", userSchema);
export default userModel;