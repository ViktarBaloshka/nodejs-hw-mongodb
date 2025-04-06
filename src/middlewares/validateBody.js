import createError from 'http-errors';

export const validateBody = (schemaValidation) => async (req, _res, next) => {
  try {
    await schemaValidation.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    next(new createError.BadRequest(err.message));
  }
};
