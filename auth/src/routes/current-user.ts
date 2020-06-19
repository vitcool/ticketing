import express from "express";
import jwt from "jsonwebtoken";

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
