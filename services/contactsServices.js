import { nanoid } from "nanoid";
import path from "path";
import * as fs from "fs/promises";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const resReadFile = await fs.readFile(contactsPath, "utf8");
    const resArr = JSON.parse(resReadFile);
    return resArr;
  } catch (err) {
    console.log("Error: ", err);
  }
}
export async function getContact(contactId) {
  try {
    const resReadFile = await fs.readFile(contactsPath, "utf8");
    const resArr = JSON.parse(resReadFile);

    const resId = resArr.find((newArr) => newArr.id === contactId);
    if (resId) return resId;
    return null;
  } catch (err) {
    console.log("Error: ", err);
  }
}
export async function removeContact(contactId) {
  try {
    const resReadFile = await fs.readFile(contactsPath, "utf8");
    const resArr = JSON.parse(resReadFile);

    const objId = resArr.find((newArr) => newArr.id === contactId);
    const objDelId = resArr.filter((newArr) => newArr.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(objDelId));

    if (objId) return objId;
    return null;
  } catch (err) {
    console.log("Error: ", err);
  }
}
export async function addContact(name, email, phone) {
  try {
    const resReadFile = await fs.readFile(contactsPath, "utf8");
    const resArr = JSON.parse(resReadFile);

    const addObj = { id: nanoid(), name, email, phone };
    resArr.push(addObj);
    await fs.writeFile(contactsPath, JSON.stringify(resArr));
    return addObj;
  } catch (err) {
    console.log("Error: ", err);
  }
}
export async function updateContact(id, body) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => id === contact.id);
    if (index === -1) {
      return null;
    }

    contacts[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {}
}