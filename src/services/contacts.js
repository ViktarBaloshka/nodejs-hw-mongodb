import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.favourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.favourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().countDocuments({ userId }),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (contactId, userId) => {
  return ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
};

export const createContact = async (payload, userId) => {
  return await ContactsCollection.create({ ...payload, userId });
};

export const updateContact = async (contactId, contact, userId) => {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contact,
    {
      new: true,
    },
  );
};

export const deleteContact = async (contactId, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};
