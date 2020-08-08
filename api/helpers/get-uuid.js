const { v4: uuidv4 } = require('uuid');
module.exports = {

  sync: true,

  friendlyName: 'Get uuid',

  description: 'Generate a unique ID for every new record created',

  inputs: {},

  exits: {

    success: {
      outputFriendlyName: 'Uuid',
    },

  },
  fn: function (inputs) {
    //Set the uuid
    let uuid = uuidv4();
    //Just return the value of uuid created above
    return uuid;
  }
};

