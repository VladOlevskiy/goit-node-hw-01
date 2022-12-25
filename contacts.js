const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, 'db/contacts.json');

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeDB(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  const contacts = await readDb();
  console.log(contacts);
}

async function getContactById(contactId) {
  const contacts = await readDb();
  const foundedContactById = contacts.filter(
    contact => contact.id == contactId
  );
  console.log(foundedContactById);
}

async function removeContact(contactId) {
  const contacts = await readDb();
  const updateContacts = contacts.filter(contact => contact.id != contactId);
  await writeDB(updateContacts);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contacts = await readDb();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await writeDB(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
