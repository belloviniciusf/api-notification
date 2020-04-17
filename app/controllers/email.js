const Ajv = require('ajv');
const _ = require('lodash');
const sendgridV3 = require('@sendgrid/mail');
const EmailSchema = require('../schemas/EmailSchema');
const EmailModel = require('../models/Email');

const ajv = new Ajv();

module.exports = () => {
  const controller = {};
  sendgridV3.setApiKey(process.env.SENDGRID_KEY);

  controller.createEmail = async (req, res) => {
    const { to, from, content, html, subject } = req.body;
    const validate = ajv.compile(EmailSchema);
    const valid = validate(req.body);

    if (!valid)
      return res
        .status(400)
        .json(`missing required parameters ${JSON.stringify(validate.errors)}`);

    if (_.isEmpty(to) || _.isEmpty(from))
      return res.status(400).json({ msg: 'To and from fields are required.' });

    const email = {
      to,
      from,
      content,
      subject,
      html,
    };

    try {
      await sendgridV3.send(email);

      const emailObj = {
        ...req.body,
      };

      const emailCreated = await EmailModel.create(emailObj);

      return res
        .status(201)
        .json({ msg: `E-mail sended successfully.`, email: emailCreated });
    } catch (error) {
      return res.status(400).json({ msg: `Error on send e-mail.`, error });
    }
  };

  return controller;
};
