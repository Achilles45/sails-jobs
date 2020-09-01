module.exports = {

  friendlyName: 'All',

  description: 'All listing.',

  inputs: {},

  exits: {
    success:{
      description: "Return all jobs with paginations"
    },
    noListings:{
      description: "No listings found"
    }
  },
  fn: async function (inputs, exits) {
    const listings = await Listing.find({}).sort('createdAt DESC')

    //Throw error message if there are no listings found
    if(!listings){
      return exits.noListings({
        message: "Sorry! There are no job listings at the moment. Please check back later"
      })
    }

    //Now return all the listings that were found
    return exits.success({
      message: "Results of all listings found in our database",
      data: listings
    })
  }


};
