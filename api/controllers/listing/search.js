module.exports = {

  friendlyName: 'Search',

  description: 'Search listing.',

  inputs: {
    title:{
      type: "string",
      required: true
    }
  },

  exits: {
    success:{
      description: "Successful"
    },
    jobListingNotFound:{
      description: "Job with this criterial does not exist"
    }
  },


  fn: async function (inputs, exits) {
    const listings = await Listing.find({
      where:{ title: inputs.title}
    })
    
    if(!listings){
      return exits.jobListingNotFound({
        message: "Job listing with this description was not found"
      })
    }

    return exits.success({
      message: "See your search results",
      data: listings
    })
  }


};
