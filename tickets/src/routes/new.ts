import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@vkticketing/common";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price should be positive;)"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, currentUser } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: currentUser.id,
    });

    await ticket.save();

    res.status(201).send({ ticket });
  },
);

export { router as createTicketRouter };
