import express from 'express';
import {createUser, loginUser} from "../controllers/index.js";

const mainRouter = express.Router();

mainRouter.post('/', createUser);
mainRouter.post('/login', loginUser);

mainRouter.use('/user', mainRouter);

export default mainRouter;
