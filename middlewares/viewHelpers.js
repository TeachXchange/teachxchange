const firebase = require('firebase')

const helpers = {};

helpers.register = () => {
  return (req, res, next) => {
    res.locals.cur_user = firebase.auth().currentUser;
    next();
  }
};

module.exports = helpers;
