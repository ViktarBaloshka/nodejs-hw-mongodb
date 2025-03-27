const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isContactType(type)) return type;
};

const parseIsFavourite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;

  if (favourite === 'false') {
    return false;
  } else if (favourite === 'true') {
    return true;
  }
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
