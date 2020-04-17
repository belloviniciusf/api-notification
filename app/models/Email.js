const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema(
  {
    to: {
      type: Object,
      required: true,
    },
    from: {
      type: Object,
      required: true,
    },
    content: {
      type: String,
    },
    html: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Email', EmailSchema);
