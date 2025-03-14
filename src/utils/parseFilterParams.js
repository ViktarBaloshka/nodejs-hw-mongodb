const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isContactType(type)) return type;
};

const parseIsFavourite = (favourite) => {
  const isBoolean = typeof favourite === 'boolean';
  if (!isBoolean) return;

  return favourite;
};

export const parseFilterParams = (query) => {
  const { type, favourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(favourite);
  return {
    type: parsedContactType,
    favourite: parsedIsFavourite,
  };
};
