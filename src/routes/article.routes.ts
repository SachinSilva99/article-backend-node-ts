import {Router} from "express";
import {verifyToken} from "../middleware";
import {
  createArticle, deleteArticle,
  getALlArticles,
  getArticleOfUser,
  getMyArticle,
  updateArticle
} from "../controllers/article.controller";

const router = Router();

router.post("/", verifyToken, createArticle);
router.get('/all', getALlArticles);
router.get('/all/get/my', verifyToken, getMyArticle);
router.get('/all/:username', getArticleOfUser);
router.put('/:articleId', verifyToken, updateArticle);
router.delete("/:id", verifyToken, deleteArticle);
export default router;