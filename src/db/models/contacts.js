import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },

  { timestamps: true, versionKey: false },
);

contactsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.userId;
  return obj;
};

export const ContactsCollection = model('Contact', contactsSchema);
