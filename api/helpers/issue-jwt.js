const jwt = require('jsonwebtoken');
module.exports = {

  friendlyName: 'Issue jwt',

  sync: true,

  description: 'This issues a new jwt token',

  inputs: {
    payload:{
      type: "ref",
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: function (inputs) {
    const key = "jobfair";
    const token = jwt.sign(inputs.payload, key);
    return token;
  }


};

