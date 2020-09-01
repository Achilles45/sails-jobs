module.exports = {

  friendlyName: 'Apply',

  description: 'Apply application.',

  inputs: {
    jobId:{
      type: "string",
      required: true
    },
  },

  exits: {
    success:{
      description: "Application successfull"
    },
    jobNotFound: {
      description: "Job not found"
    }
  },


  fn: async function (inputs, exits) {
    try {
      //First find the job the user wants to apply for
      const jobAppliedTo = await Listing.findOne({id: inputs.jobId});
      if(!jobAppliedTo){
        return exits.jobNotFound({
          message: "Oops! It seems like the job you are trying to apply to no longer exist"
        })
      }
      const newApplication = await Application.create({
        id: sails.helpers.getUuid(),
        job: jobAppliedTo,
        applicant: this.req.me.id
      }).fetch()
      return exits.success({
        message: "Job application was successful",
        data: newApplication
      })
    } catch (error) {
      sails.log(error)
    }

  }


};
