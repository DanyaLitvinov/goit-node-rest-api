const express = require("express");
const contactsControllers = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const validateSchema = require("../schemas/contactsSchemas.js");
const IdValidation = require("../helpers/IdValidation.js");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", IdValidation, contactsControllers.getContactById);

contactsRouter.delete("/:id", IdValidation, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(validateSchema.createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  IdValidation,
  validateBody(validateSchema.updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  IdValidation,
  validateBody(validateSchema.updateFavoriteSchema),
  contactsControllers.updateFavorite
);

module.exports = contactsRouter;
