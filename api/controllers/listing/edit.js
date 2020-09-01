module.exports = {

  friendlyName: 'Edit',

  description: 'Edit listing.',

  inputs: {
    id:{
      type: "string",
      required: true
    },
    title:{
      type: 'string',
      required: true
    },
    language:{
      type: 'string',
      required: true,
    },
    experience:{
      type: 'string',
      required: true
    },
    location:{
      type: 'string',
      required: true
    },
    salary:{
      type: 'string',
      required: true
    },
    description:{
      type: 'string',
      required: true
    },
  },
  exits: {
    success:{
      description: "Job listing was successfully created"
    }
  },


  fn: async function (inputs, exits) {
    //First find the job ad with the passed in ID
    const listingToBeUpdated = await Listing.update({id: inputs.id}).set({
      title: inputs.title,
      language: inputs.language,
      experience: inputs.experience,
      location: inputs.location,
      salary: inputs.salary,
      description: inputs.description
    }).fetch()
    return exits.success({
      message: "Job listing was successfully edited",
      data: listingToBeUpdated
    })
  }


};
