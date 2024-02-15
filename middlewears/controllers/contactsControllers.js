const controllerWrapper = require("../helpers/controllerWraper.js");
const HttpError = require("../helpers/HttpError");

const Contact = require("../models/contact.js");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  //pagination
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  //filtration by favorite or return all contacts
  const filter = favorite ? { favorite: favorite === "true" } : {};

  const result = await Contact.find({ owner }, filter).skip(skip).limit(limit); //запит за всіма даними в колекції
  if (!result) throw HttpError(404);

  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) throw HttpError(404);

  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
  if (!result) throw HttpError(404);

  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  if (!Object.keys(req.body).length) throw HttpError(400, "Body is empty");

  const result = await Contact.create({ ...req.body, owner });
  if (!result) throw HttpError(400);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  if (!Object.keys(req.body).length)
    throw HttpError(400, "Body must have at least one field");

  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);

  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  if (!Object.keys(req.body).length)
    throw HttpError(400, "missing field favorite");

  const { id } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
  if (!result) throw HttpError(404);

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateFavorite: controllerWrapper(updateFavorite),
};
