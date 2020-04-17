module.exports = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    customer: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: ['phone', 'message', 'type', 'customer'],
};
