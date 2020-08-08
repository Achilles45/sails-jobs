module.exports = {

  friendlyName: 'Home Page',

  description: 'This is the landing page of the application',

  inputs: { },


  exits: {
    success:{
      description: "Everything went well"
    }
  },

  fn: async function (inputs, exits) {
    return exits.success({message: "You have now reached jopfair web service"})
  }


};
