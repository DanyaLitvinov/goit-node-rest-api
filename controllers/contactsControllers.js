import HttpError from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { addContact, getContact, listContacts, removeContact, updateContact } from "../services/contactsServices.js";
export const getAllContacts = async (req, res) => {
    try {
        const result = await listContacts();
        res.status(200).json(result);
    } catch (error) {
        HttpError(500, "Server error!");
    }
};
export const getContactById = async (req, res, next) => {
    try {
        const result = await getContact(req.params.id);
        if (!result) {
            throw HttpError(404); 
        }

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
};
export const deleteContact = async (req, res, next) => {
    try {
        const result = await removeContact(req.params.id);
        if (!result) {
            throw HttpError(404); 
        }

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
};
export const createContact = async (req, res, next) => {
    try {
        const { error } = createContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message)
        }
        
        const { name, email, phone } = req.body;
        const result = await addContact(name, email, phone);
        if (!result) {
                throw HttpError(404);
            }

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
};
export const updateContactById = async (req, res, next) => {
    try {
         if (Object.keys(req.body).length ===0) {
            throw HttpError(400, "Body must have at least one field");
        }
         const { error } = updateContactSchema.validate(req.body);
         if (error) { throw HttpError(400, error.message); } 

        const { id } = req.params;
        const result = await updateContact(id, req.body);
        if (!result) { throw HttpError(404, "Not found"); }
        res.json(result);
    } catch (error) {
       next(error)
    }
};