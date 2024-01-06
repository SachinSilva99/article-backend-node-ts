import {ObjectId} from "mongodb";

export interface IUser extends Document{
  username: string,
  fname: string,
  lname: string,
  email: string,
  password: string
}
export interface IArctile extends Document{
  title: string,
  description: string,
  publishedDate: string,
  user: ObjectId
}