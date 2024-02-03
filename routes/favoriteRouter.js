import { Router } from "express";
import { updateStatusContact } from "../controllers/contactsControllers.js";

const favoriteRouter = Router();

favoriteRouter.patch("/:contactId/favorite", updateStatusContact);

export default favoriteRouter;