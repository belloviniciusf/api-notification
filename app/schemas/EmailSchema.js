module.exports = {
  type: 'object',
  properties: {
    to: {
      type: 'string',
    },
    from: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    subject: {
      type: 'string',
    },
    html: {
      type: 'string',
    },
    customer: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: ['to', 'from', 'customer', 'subject'],
};
