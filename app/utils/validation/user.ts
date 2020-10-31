export const createUserRule = {
  name: {
    required: true,
    type: 'string',
  },
  password: {
    required: true,
    type: 'string',
    min: 6,
    trim: true,
    format: /^[a-zA-Z].{5,32}/,
  },
};

export const getUserRule = {
  id: {
    required: true,
    type: 'int',
    convertType: 'int',
  },
};
