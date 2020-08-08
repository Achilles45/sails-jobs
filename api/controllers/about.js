module.exports = {

  friendlyName: 'About Page',

  description: 'This is the about page of the application',

  inputs: { },


  exits: {
    success:{
      description: "Everything went well"
    }
  },

  fn: async function (inputs, exits) {
    return exits.success({message: "You have reached the about page of jopfair"})

  }


};
