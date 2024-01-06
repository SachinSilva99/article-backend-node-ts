import {Request, Response} from "express";
import ArticleModel from "../models/article.models";
import {ObjectId} from "mongodb";
import {CustomResponse} from "../dtos/custom.response";
import {IArctile, IUser} from "../types/SchemaTypes";
import UserModel from "../models/user.model";

export const createArticle = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    let user_id = res.tokenData.user._id;
    const {title, description, publishedDate} = req.body;
    const articleModel = new ArticleModel({
      title: title,
      description: description,
      publishedDate: publishedDate,
      user: new ObjectId(user_id)
    });
    const savedArticle = await articleModel.save();
    res.status(200).send(new CustomResponse<IUser>(200, "OK", savedArticle._id));
  } catch (err) {
    res.status(100).send(err);
  }
}
export const getALlArticles = async (req: Request, res: Response) => {

  try {
    const query: any = req.query;
    const {page, size} = query;
    const articles: IArctile[] = await ArticleModel.find().limit(size).skip(size * (page - 1));
    const countDocuments = await ArticleModel.countDocuments();
    const pageCount = Math.ceil(countDocuments / size);
    const customResponse = new CustomResponse<IArctile[]>(200, "OK", articles, pageCount);
    res.send(customResponse);
  } catch (er) {
    res.status(100).send(er);
  }
}
export const getMyArticle = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    let user_id = res.tokenData.user._id;
    const query: any = req.query;
    const {page, size} = query;
    const user = await UserModel.findOne({_id: user_id});
    if (!user) {
      const customResponse = new CustomResponse<IUser>(404, "User not found");
      res.send(customResponse);
      return;
    }
    const articles: IArctile[] = await ArticleModel.find({user: user._id}).limit(size).skip(size * (page - 1));
    const countDocuments = await ArticleModel.countDocuments({user: user._id});
    const pageCount = Math.ceil(countDocuments / size);
    const customResponse = new CustomResponse<IArctile[]>(200, "OK", articles, pageCount);
    res.send(customResponse);
  } catch (er) {
    res.status(100).send(er);
  }
}
export const getArticleOfUser = async (req: Request, res: Response) => {
  try {
    //@ts-ignore

    const query: any = req.query;
    const {page, size} = query;
    const username = req.params.username;

    const user = await UserModel.findOne({username: username});
    if (!user) {
      const customResponse = new CustomResponse<IUser>(404, "User not found");
      res.send(customResponse);
      return;
    }
    const articles: IArctile[] = await ArticleModel.find({user: user._id}).limit(size).skip(size * (page - 1));
    const countDocuments = await ArticleModel.countDocuments({user: user._id});
    const pageCount = Math.ceil(countDocuments / size);
    const customResponse = new CustomResponse<IUser>(200, "OK", articles, pageCount);
    res.send(customResponse);
  } catch (er) {
    res.status(100).send(er);
  }
}
export const updateArticle = async (req: Request, res: any) => {
  let user_id = res.tokenData.user._id;
  const articleId = req.params.articleId;

  const user = await UserModel.findOne({_id: user_id});
  if (!user) {
    const customResponse = new CustomResponse<IUser>(404, "User not found");
    res.send(customResponse);
    return;
  }
  const article = await ArticleModel.findOne({_id: articleId, user: user_id});
  if (!article) {
    const customResponse = new CustomResponse(401, "Access denied");
    res.send(customResponse);
    return;
  }
  await ArticleModel.findOneAndUpdate({_id: articleId}, {
    title: req.body.title,
    description: req.body.description
  })
    .then(r => {
      res.send(new CustomResponse(200, "Article updated successfully"));
    })
    .catch(er => res.send(new CustomResponse(100, "Something went wrong")));
}
export const deleteArticle = async (req: Request, res: any) => {
  let user_id = res.tokenData.user._id;
  const articleId = req.params.id;
  const article = await ArticleModel.findOne({_id: articleId, user: user_id});
  if (article) {
    await ArticleModel.deleteOne(({_id: articleId}))
      .then(r =>
        res.send(new CustomResponse(200, "Article deleted successfully"))
      )
      .catch(er =>
        res.status(100).send(new CustomResponse(100, "Something went wrong")));
  } else {
    res.status(401).send(new CustomResponse(401, "Access denied"));
  }
}