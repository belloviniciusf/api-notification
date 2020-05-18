module.exports = (app) => {
    const controller = app.controllers.sms;

    app.route('/sms/compose').post(controller.sendSMS);

    app.route('/sms/logs').post(controller.getSMSLog);
};
