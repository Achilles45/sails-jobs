module.exports = {

  friendlyName: 'Signin',

  description: 'Signin user.',

  inputs: {
    userName:{
      type: "string",
    },
    emailAddress:{
      type: "string"
    },
    password:{
      type: "string",
      required: true
    }
  },
  exits: {
    success:{
      description: "Successfully logged in"
    },
    badCombo:{
      description: "Credentails do not match"
    },
    notRegistered:{
      description: "Not registered on this platform"
    }
  },
  fn: async function (inputs, exits) {
    try {
      //Allow a user to login with username & passowrd or emailAddress & password
      //First check if a user with the email address provided exists
      const user = await User.findOne({userName: inputs.userName, emailAddress: inputs.emailAddress});

      //Check now if the user exists
      if(!user){
        return exits.notRegistered({
          message: "Oops! This is not a registered user"
        })
      }

      //Now check if the passwords match since the user was found in our database
      await sails.helpers.passwords.checkPassword(inputs.password, user.password)
      .intercept("incorrect", (error)=>{
        return exits.badCombo({
          message: "Oops! Your credentials did not match"
        })
      })

      //Generate a new token
      const token = await sails.helpers.generateNewJwtToken(user.userName);

      //Set the user
      this.req.me = user;

      //Return the signed in user
      return exits.success({
        message: "You have been successfully logged",
        data: user,
        token
      })

    } catch (error) {
      sails.log.error(error);
    }

  }
};
