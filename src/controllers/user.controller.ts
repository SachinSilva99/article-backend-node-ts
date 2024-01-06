import {Request, Response} from "express";
import {IUser} from "../types/SchemaTypes";
import UserModel from "../models/user.model";
import {CustomResponse} from "../dtos/custom.response";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await UserModel.find();
    const customResponse = new CustomResponse<IUser>(200, "OK", users);
    res.send(customResponse);
  } catch (er) {
    res.status(100).send(er);
  }
}
export const createUser = async (req: Request, res: Response) => {
  try {
    let {username, fname, lname, email, password} = req.body;
    password = await bcrypt.hash(password, 10);
    const userModel = new UserModel({
      username,
      fname,
      lname,
      email,
      password
    });
    const savedUser: any = await userModel.save();
    res.status(200).send(new CustomResponse<IUser>(200, "OK", savedUser._id));
  } catch (err) {
    console.log(err)
    res.status(100).send(err);
  }
}
export const auth = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // TODO:token generate
        user.password = "";
        const expiresIn = "1w";
        jwt.sign({user}, process.env.SECRET_KEY as Secret, {expiresIn}, (err: any, token: any) => {
          if (err) {
            res.status(100).send(new CustomResponse(200, "Something went wrong"));
          } else {
            const resBody = {
              user: user,
              accessToken: token
            }
            res.status(200).send(new CustomResponse(200, "Access", resBody));
          }
        });
      } else {
        res.status(401).send(new CustomResponse(401, "Invalid credentials"));
      }
    } else {
      res.status(404).send(new CustomResponse(401, "User not found"));
    }

  } catch (err) {
    res.status(100).send(new CustomResponse(100, "err"));
  }
}