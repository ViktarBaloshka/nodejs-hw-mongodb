import Joi from 'joi';

export const createContactSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  phoneNumber: Joi.string()
    .length(13)
    .pattern(/^[0-9]+$/)
    .required()
    .message({
      'string.length':
        'Phone number should start "+" and have at 12 characters',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(25),
  phoneNumber: Joi.string()
    .length(13)
    .pattern(/^[0-9]+$/)
    .message({
      'string.length':
        'Phone number should start "+" and have at 12 characters',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
