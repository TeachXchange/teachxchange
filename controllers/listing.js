const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);

    return router;
  },
  index(req, res) {
      res.render('listing');
  },
};
