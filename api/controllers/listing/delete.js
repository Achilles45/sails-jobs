module.exports = {

  friendlyName: 'Delete',

  description: 'Delete listing.',

  inputs: {
    id:{
      type: "string"
    }
  },


  exits: {
    success:{
      description: "Successfully deleted"
    }
  },


  fn: async function (inputs, exits) {
    await Listing.destroy({id: inputs.id})
    return exits.success({
      message: "Successfully deleted"
    })
  }


};
