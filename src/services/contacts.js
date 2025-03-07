import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactsById = async (contactId) => {
  const contactById = await ContactsCollection.findById(contactId);
  return contactById;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, contact) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  return ContactsCollection.findByIdAndDelete(contactId);
};
