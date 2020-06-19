import express from "express";
import { currentUser } from "@vkticketing/common";

const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
