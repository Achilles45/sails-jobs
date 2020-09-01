module.exports = {


  friendlyName: 'New',


  description: 'New listing.',


  inputs: {
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
      description: 'A new listing was successful'
    }
  },


  fn: async function (inputs, exits) {
    //Create a new record - job listing
    const listing = await Listing.create({
      id: sails.helpers.getUuid(),
      title: inputs.title,
      language: inputs.language,
      experience: inputs.experience,
      location: inputs.location,
      salary: inputs.salary,
      description: inputs.description,
      lister: this.req.me.id
    }).fetch();

    //Return created record if everything went well
    return exits.success({
      message: 'Your job ads was created successfully',
      data: listing
    });
  }


};
