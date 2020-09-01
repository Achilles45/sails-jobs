module.exports = {

  friendlyName: 'Show the details of a particular job',

  description: 'Get and show a particular job and its details',

  inputs: {
    id:{
      type: "string",
      required: true
    }
  },

  exits: {
    success:{
      description: "Job listing found"
    },
    doesNotExist:{
      description: "Job with this id does not exist"
    }
  },


  fn: async function (inputs, exits) {
    //First find the job listing that has that ID in request
    const listing = await Listing.findOne({id: inputs.id})

    //Check if no job was found
    if(!listing){
      return exits.doesNotExist({
        message: "This job does not exist"
      })
    }

    //Now return the job that was found
    return exits.success({
      message: "See the details of this job listing",
      data: listing
    })
  }
};
