import createError from 'http-errors';

export const validateBody = (schemaValidation) => async (req, res, next) => {
  try {
    await schemaValidation.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    next(createError.BadRequest(err.message));
  }
};
