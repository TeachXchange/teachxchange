const firebase = require('firebase')

const redirect = {};

redirect.ifLoggedIn = (route) =>
  (req, res, next) => (firebase.auth().currentUser ? res.redirect(route) : next());

redirect.ifNotLoggedIn = (route = '/login') =>
  (req, res, next) => (firebase.auth().currentUser ? next() : res.redirect(route));

redirect.ifNotAuthorized = (route) =>
  (req, res, next) => (req.user.username !== req.params.username ? res.redirect(route) : next());

module.exports = redirect;
