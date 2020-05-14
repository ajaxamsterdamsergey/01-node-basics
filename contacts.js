const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

exports.listContacts = () =>
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
exports.getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contact = JSON.parse(data).find((item) => item.id === contactId);
    console.table(contact);
  });
};

exports.removeContact = (contactId) => {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const filteredContacts = JSON.stringify(
      JSON.parse(data).filter((item) => item.id !== contactId)
    );

    fs.writeFile(contactsPath, filteredContacts, (err) => {
      if (err) throw err;
    });
  });
};

exports.addContact = (name, email, phone) => {
  const id = shortid.generate();
  const newContact = { id, name, email, phone };
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;

    const filteredContacts = JSON.stringify(
      data ? [...JSON.parse(data), newContact] : [newContact]
    );
    fs.writeFile(contactsPath, filteredContacts, (err) => {
      if (err) throw err;
    });
  });
};