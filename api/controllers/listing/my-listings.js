module.exports = {

  friendlyName: 'My listings',

  description: 'Return the listings for this logged in user',

  inputs: {},

  exits: {
    success:{
      description: "Listings found"
    },
    noListings:{
      description: "No listings found"
    },
    invalid:{
      description: "Invalid request"
    }
  },

  fn: async function (inputs, exits) {
    try {
      //First get the user id
      const userId = this.req.me.id
      const listings = await Listing.find({lister: userId})
      if(!listings){
        return exits.noListings({
          message: "No listing was found for this user"
        })
      }else{
        return exits.success({
          message: "Successfully found your listings",
          data: listings
        })
      }
    } catch (error) {
      if(error){
        return exits.invalid({
          message: "Invalid request"
        })
      }
    }
  }

};
