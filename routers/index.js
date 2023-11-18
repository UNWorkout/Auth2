import express from 'express';
import {createUser, loginUser, getUserEmailById} from "../controllers/index.js";

const mainRouter = express.Router();

mainRouter.post('/', createUser);
mainRouter.post('/login', loginUser);
mainRouter.get('/iduser/:id', getUserEmailById);

mainRouter.use('/user', mainRouter);

export default mainRouter;
