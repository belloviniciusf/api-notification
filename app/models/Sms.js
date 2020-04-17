const mongoose = require('mongoose');

const SmsSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['sent', 'answer'],
    },
    customer: {
      type: String,
      required: true,
    },
    totalVoiceSmsId: {
      type: String,
      required: true,
    },
    answerDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sms', SmsSchema);
