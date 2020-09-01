/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName:{
      type: "string",
      required: true,
      example: "Achilles Usuoyibo",
      description: "A representation of the user's name"
    },
    lastName:{
      type: "string",
      required: true,
      example: "Achilles Usuoyibo",
      description: "A representation of the user's name"
    },
    emailAddress:{
      type: "string",
      required: true,
      isEmail: true,
      example: "achilles@gmail.com",
      unique: true,
      description: "The users valid email address"
    },
    phoneNumber:{
      type: "number",
      required: true,
      unique: true,
      example: 09098982644,
      description: "The phone number of the user"
    },
    accountType:{
      type: "string",
      required: true,
      description: "A user can either be a regular job seeker or a company that is looking to hire talents",
      example: "Talent || Employer"
    },
    password:{
      type: "string",
      required: true,
      description: "A secured hashed version of the users password",
      example: "achillled7394578sdjdujwe"
    },
    listings:{
      collection: 'Listing',
      via: "lister"
    },
    applications:{
      collection: 'Application',
      via: "applicant"
    }
  },
  //Custom response to avoid sending back password back to the user
  customToJSON: function(){
    return _.omit(this, ["password"])
  },
  //Hash the password before sending it to DB
  beforeCreate: function(values, proceed){
    sails.helpers.passwords.hashPassword(values.password)
    // eslint-disable-next-line handle-callback-err
    .exec((err, hashedPassword)=>{
      values.password = hashedPassword;
      return proceed();
    })
  }

};

