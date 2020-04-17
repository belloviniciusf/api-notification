module.exports = (app) => {
  const controller = app.controllers.email;

  app.route('/email/send').post(controller.createEmail);
};
