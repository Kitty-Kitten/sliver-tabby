export const createUserRule = {
  name: {
    required: true,
    type: 'string',
  },
  password: {
    required: true,
    type: 'string',
  },
};

export const getUserRule = {
  id: {
    required: true,
    type: 'int',
    convertType: 'int',
  },
};
