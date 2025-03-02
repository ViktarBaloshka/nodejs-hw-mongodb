import { getAllContacts, getContactsById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);
  if (contact === null) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: contact,
  });
};
