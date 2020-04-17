const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });

    // const apiNotificationDbConnection = mongoose.createConnection(
    //   process.env.MONGO_URL,
    //   {
    //     useNewUrlParser: true,
    //     useFindAndModify: true,
    //   }
    // );

    // apiNotificationDbConnection.on('open', () => {
    //   console.log('Mongoose! Conectado em', process.env.MONGO_URL);
    // });

    // apiNotificationDbConnection.on('close', () => {
    //   console.log('Mongoose! Desconectado de', process.env.MONGO_URL);
    //   console.log('Trying again in 5 seconds');
    //   setTimeout(() => {
    //     connect();
    //   }, 5000);
    // });

    // apiNotificationDbConnection.on('error', (error) => {
    //   console.error('Mongo! Connection Error', error);
    //   console.log('Trying again in 5 seconds');
    //   setTimeout(() => {
    //     connect();
    //   }, 5000);
    // });
  }

  connect();
};
