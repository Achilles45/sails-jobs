module.exports = {


  friendlyName: 'Filter',


  description: 'Filter listing.',


  inputs: {
    title:{
      type: "string"
    },
    level:{
      type: "string",
    },
    type: {
      type: "string"
    }
  },


  exits: {
    success:{
      description: "Filter successfully"
    },
    noListingMatchesCriterial:{
      description: "No listing was found to match your search criterials"
    }
  },


  fn: async function (inputs, exits) {
    const filteredListing = await Listing.find({
      where: {title: inputs.title, experience: inputs.level, location: inputs.type}
    })
    if(!filteredListing){
      return exits.noListingMatchesCriterial({
        message: "No listing was found to match your search criterial"
      })
    }
    return exits.success({
      message: "Listing(s) successfully returned",
      data: filteredListing
    })
  }


};
