import express from "express";
import { requireAuth } from "../middlewares/require-auth";

import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get("/api/users/currentUser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
