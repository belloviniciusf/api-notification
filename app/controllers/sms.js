const Ajv = require('ajv');

const ajv = new Ajv();
const TotalVoice = require('totalvoice-node');
const SmsAnswerSchema = require('../schemas/SmsAnswer');
const SmsModel = require('../models/Sms');

module.exports = () => {
  const controller = {};
  const totalVoiceClient = new TotalVoice(process.env.TOTALVOICE_KEY);

  controller.sendSMS = async (req, res) => {
    const validate = ajv.compile(SmsAnswerSchema);
    const valid = validate(req.body);

    if (!valid)
      return res
        .status(400)
        .json(`missing required parameters ${JSON.stringify(validate.errors)}`);

    try {
      const data = await totalVoiceClient.sms.enviar(
        `55${req.body.phone}`,
        `${req.body.message}`,
        true,
        false,
        ''
      );

      if (!data || data.sucesso === false)
        return res
          .status(400)
          .json({ msg: 'Ocorreu um erro no envio do SMS', err: data });

      const sms = await SmsModel.create({
        ...req.body,
        totalVoiceSmsId: String(data.dados.id),
      });

      return res.status(201).json(sms);
    } catch (error) {
      return res
        .status(400)
        .json({ msg: 'Ocorreu um erro no envio do SMS', err: error });
    }
  };

  controller.getSMSLog = async (req, res) => {
    if (!req.body.sms_id) return res.status(400).json('sms id not found');

    const { sms_id, resposta, data_resposta } = req.body;

    try {
      const sms = await SmsModel.findOne({
        totalVoiceSmsId: sms_id,
        type: 'sent',
      });

      if (!sms) return res.status(400).json(`SMS with ${sms_id} id not found`);

      const smsObj = {
        type: 'answer',
        totalVoiceSmsId: sms_id,
        customer: sms.customer,
        message: resposta,
        answerDate: data_resposta,
      };

      const smsCreated = await SmsModel.create(smsObj);

      return res.status(201).json(smsCreated);
    } catch (error) {
      return res.status(400).json({
        msg: 'Error on receive SMS log',
        err: error,
      });
    }
  };

  return controller;
};
