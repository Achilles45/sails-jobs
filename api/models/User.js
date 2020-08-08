/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Email address of the user
    emailAddress:{
      type: "string",
      required: true,
      isEmail: true,
      unique: true,
      example: "example@gmail.com",
      description: "A representation of the users email address"
    },
    userName:{
      type: "string",
      required: true,
      example: "Achilles45",
      description: "A representation of the users username"
    },
    //Full name of the user
    fullName:{
      type: "string",
      required: true,
      example: "Achilles Usuoyibo",
      description: "A representation of the users full name"
    },
    //Password of the user
    password:{
      type: "string",
      required: true,
      example: "sfsfkhf4r8730nm1mq2sdgnarklfgm",
      description: "A representation of the users encrypted password"
    }
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  //Do not return the password of the user when you return data
  customToJSON: function(){
    return _.omit(this, ["password"])
  },
  //Hash the password before sending to database using the beforeCreate hook
  beforeCreate: function(values, proceed){
    sails.helpers.passwords.hashPassword(values.password)
    .exec((err, hashedPassword)=>{
      values.password = hashedPassword
      proceed()
    })
  }

};
