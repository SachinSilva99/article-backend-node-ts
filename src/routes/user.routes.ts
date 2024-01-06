import {Router} from "express";
import {auth, createUser, getAllUsers} from "../controllers/user.controller";


const router = Router();
router.get('/all', getAllUsers);
router.post("/", createUser);
router.post("/auth", auth);
export default router;