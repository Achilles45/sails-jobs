module.exports = {

  friendlyName: 'Generate new jwt token',

  description: 'Generate a new token for users',

  inputs: {
    subject:{
      type: "string",
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },

  },
  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject,
      iss: "Jobfair backend",
    }
    const token = sails.helpers.issueJwt(payload);
    return token;
  }

};

