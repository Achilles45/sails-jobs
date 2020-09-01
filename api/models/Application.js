/**
 * Application.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    job:{
      type: "ref",
      required: true,
      description: "This is the details about the job being applied to",
      example: "ahdn490djkak49sldd"
    },
    // applicantI:{
    //   type: "string",
    //   required: true,
    //   description: "This is the unique ID of the representation of the person wanting to apply to job",
    //   example: "adfa98-72flh9-929wfd94jd"
    // },
    applicant:{
      model: "User"
    }
  },

};

