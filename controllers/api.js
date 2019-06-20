const { promisify } = require('util');

exports.getApi = (req, res) => {
    res.render('api/index', {
      title: 'API Examples'
    });
  };


