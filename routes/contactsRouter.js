const express = require("express");
const contactsControllers = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const validateSchema = require("../schemas/contactsSchemas.js");
const { isValidId, authenticate } = require("../middlewears");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsControllers.getAllContacts);

contactsRouter.get(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.getContactById
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.deleteContact
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(validateSchema.createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(validateSchema.updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(validateSchema.updateFavoriteSchema),
  contactsControllers.updateFavorite
);

module.exports = contactsRouter;
